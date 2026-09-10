<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <div class="inquiry-reel" :class="orientation">
        <button 
            v-if="showArrows && hasPrevious" 
            class="reel-nav-btn prev-btn"
            @click="goToPrevious"
            :aria-label="t('agora', 'Previous inquiry')"
        >
            <component :is="isVertical ? ArrowUp : ArrowLeft" size="32" />
        </button>

        <div class="reel-container" ref="reelContainer">
            <div 
                class="reel-track"
                :style="trackStyle"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            >
                <div 
                    v-for="(inquiry, index) in inquiries" 
                    :key="inquiry.id"
                    class="reel-item"
                    :class="{ active: currentIndex === index }"
                    @click="openInquiry(inquiry.id)"
                >
                    <InquiryItem 
                        :inquiry="inquiry"
                        :grid-view="true"
                        class="reel-inquiry-item"
                    >
                        <template #actions>
                            <InquiryItemActions
                                v-if="inquiry.permissions.edit || sessionStore.appPermissions.inquiryCreation"
                                :key="`actions-${inquiry.id}`"
                                :inquiry="inquiry"
                            />
                        </template>
                    </InquiryItem>
                    
                    <div class="reel-progress" v-if="showProgress">
                        <div 
                            class="reel-progress-bar"
                            :style="{ width: `${((currentIndex + 1) / inquiries.length) * 100}%` }"
                        />
                    </div>
                </div>
            </div>
        </div>

        <button 
            v-if="showArrows && hasNext" 
            class="reel-nav-btn next-btn"
            @click="goToNext"
            :aria-label="t('agora', 'Next inquiry')"
        >
            <component :is="isVertical ? ArrowDown : ArrowRight" size="32" />
        </button>

        <!-- Dot indicators -->
        <div v-if="inquiries.length > 1" class="reel-dots">
            <button
                v-for="(_, index) in inquiries"
                :key="index"
                class="reel-dot"
                :class="{ active: currentIndex === index }"
                @click="goToIndex(index)"
                :aria-label="t('agora', 'Go to inquiry {index}', { index: index + 1 })"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import InquiryItem from './InquiryItem.vue'
import InquiryItemActions from './InquiryItemActions.vue'
import { useSessionStore } from '../../stores/session.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

const ArrowLeft = InquiryGeneralIcons.ArrowLeft || 'span'
const ArrowRight = InquiryGeneralIcons.ArrowRight || 'span'
const ArrowUp = InquiryGeneralIcons.ArrowUp || 'span'
const ArrowDown = InquiryGeneralIcons.ArrowDown || 'span'

const props = defineProps<{
    inquiries: any[]
    orientation?: 'vertical' | 'horizontal'
    showArrows?: boolean
    showProgress?: boolean
}>()

const emit = defineEmits<{
    (e: 'change', index: number): void
    (e: 'itemClick', inquiry: any): void
}>()

const sessionStore = useSessionStore()
const router = useRouter()

const currentIndex = ref(0)
const isTransitioning = ref(false)
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchDelta = ref(0)
const isDragging = ref(false)

const orientation = computed(() => props.orientation || 'vertical')
const isVertical = computed(() => orientation.value === 'vertical')

const hasPrevious = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < props.inquiries.length - 1)

const trackStyle = computed(() => {
    if (isVertical.value) {
        return {
            transform: `translateY(-${currentIndex.value * 100}%)`,
            transition: isTransitioning.value ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }
    } else {
        return {
            transform: `translateX(-${currentIndex.value * 100}%)`,
            transition: isTransitioning.value ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }
    }
})

const goToNext = () => {
    if (hasNext.value && !isTransitioning.value) {
        isTransitioning.value = true
        currentIndex.value++
        emit('change', currentIndex.value)
        setTimeout(() => {
            isTransitioning.value = false
        }, 500)
    }
}

const goToPrevious = () => {
    if (hasPrevious.value && !isTransitioning.value) {
        isTransitioning.value = true
        currentIndex.value--
        emit('change', currentIndex.value)
        setTimeout(() => {
            isTransitioning.value = false
        }, 500)
    }
}

const goToIndex = (index: number) => {
    if (index >= 0 && index < props.inquiries.length && !isTransitioning.value) {
        isTransitioning.value = true
        currentIndex.value = index
        emit('change', currentIndex.value)
        setTimeout(() => {
            isTransitioning.value = false
        }, 500)
    }
}

const openInquiry = (inquiryId: number) => {
    router.push({ name: 'inquiry', params: { id: inquiryId } })
}

// Touch handlers for mobile
const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    touchStartX.value = touch.clientX
    touchStartY.value = touch.clientY
    isDragging.value = true
    touchDelta.value = 0
}

const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.value) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartX.value
    const deltaY = touch.clientY - touchStartY.value
    
    if (isVertical.value) {
        touchDelta.value = deltaY
    } else {
        touchDelta.value = deltaX
    }
}

const handleTouchEnd = () => {
    isDragging.value = false
    const threshold = 50
    
    if (Math.abs(touchDelta.value) > threshold) {
        if (isVertical.value) {
            if (touchDelta.value < 0 && hasNext.value) {
                goToNext()
            } else if (touchDelta.value > 0 && hasPrevious.value) {
                goToPrevious()
            }
        } else {
            if (touchDelta.value < 0 && hasNext.value) {
                goToNext()
            } else if (touchDelta.value > 0 && hasPrevious.value) {
                goToPrevious()
            }
        }
    }
    
    touchDelta.value = 0
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
    if (isVertical.value) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            goToNext()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            goToPrevious()
        }
    } else {
        if (e.key === 'ArrowRight') {
            e.preventDefault()
            goToNext()
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            goToPrevious()
        }
    }
}

// Watch for changes in inquiries
watch(() => props.inquiries.length, () => {
    if (currentIndex.value >= props.inquiries.length) {
        currentIndex.value = Math.max(0, props.inquiries.length - 1)
    }
})

// Lifecycle
onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
})

// Expose methods
defineExpose({
    goToNext,
    goToPrevious,
    goToIndex,
    currentIndex,
})
</script>

<style lang="scss" scoped>
.inquiry-reel {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 500px;
    background: var(--color-main-background);
    overflow: hidden;

    &.vertical {
        .reel-container {
            height: 100%;
            width: 100%;
        }

        .reel-track {
            flex-direction: column;
        }

        .reel-item {
            height: 100%;
            width: 100%;
            flex-shrink: 0;
        }

        .reel-nav-btn {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;

            &.prev-btn {
                top: 20px;
            }

            &.next-btn {
                bottom: 20px;
            }
        }

        .reel-dots {
            flex-direction: column;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    &.horizontal {
        .reel-container {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        .reel-track {
            flex-direction: row;
            height: 100%;
        }

        .reel-item {
            height: 100%;
            width: 100%;
            flex-shrink: 0;
        }

        .reel-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;

            &.prev-btn {
                left: 20px;
            }

            &.next-btn {
                right: 20px;
            }
        }

        .reel-dots {
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .reel-container {
        position: relative;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }

    .reel-track {
        display: flex;
        height: 100%;
        width: 100%;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .reel-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;

        .reel-inquiry-item {
            width: 100%;
            height: 100%;
            max-width: 800px;
            max-height: 600px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            background: var(--color-main-background);
            
            :deep(.inquiry-item) {
                height: 100%;
                border: none;
                border-radius: 16px;
                box-shadow: none;
                cursor: pointer;
                
                &:hover {
                    transform: none;
                    box-shadow: none;
                }

                .inquiry-item__content {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
            }
        }

        .reel-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--color-background-dark);
            border-radius: 0 0 16px 16px;
            overflow: hidden;

            .reel-progress-bar {
                height: 100%;
                background: var(--color-primary-element);
                transition: width 0.3s ease;
                border-radius: 0 0 16px 16px;
            }
        }
    }

    .reel-nav-btn {
        background: rgba(0, 0, 0, 0.6);
        border: none;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        color: white;
        backdrop-filter: blur(8px);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

        &:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.95);
        }

        .material-design-icon {
            width: 24px;
            height: 24px;
            color: white;
        }
    }

    .reel-dots {
        display: flex;
        gap: 8px;
        position: absolute;
        z-index: 10;

        .reel-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;

            &:hover {
                background: rgba(255, 255, 255, 0.6);
                transform: scale(1.2);
            }

            &.active {
                background: white;
                width: 24px;
                border-radius: 4px;
            }
        }
    }

    @media (max-width: 768px) {
        min-height: 400px;

        .reel-item {
            padding: 12px;

            .reel-inquiry-item {
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
            }
        }

        .reel-nav-btn {
            width: 40px;
            height: 40px;

            .material-design-icon {
                width: 20px;
                height: 20px;
            }
        }

        .reel-dots {
            .reel-dot {
                width: 6px;
                height: 6px;

                &.active {
                    width: 20px;
                }
            }
        }
    }

    @media (max-width: 480px) {
        min-height: 300px;

        .reel-item {
            padding: 8px;
        }

        .reel-nav-btn {
            width: 32px;
            height: 32px;

            &.prev-btn {
                top: 10px;
            }

            &.next-btn {
                bottom: 10px;
            }

            .material-design-icon {
                width: 16px;
                height: 16px;
            }
        }

        .reel-dots {
            gap: 6px;

            .reel-dot {
                width: 5px;
                height: 5px;

                &.active {
                    width: 16px;
                }
            }
        }
    }
}

// Animation for smooth transitions
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>
