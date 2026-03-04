<!--
  - SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div 
    ref="containerRef"
    class="counter-item supports"
    :class="{ 'clickable': canSupport, 'disabled': !canSupport }"
    :style="containerStyles"
    @click="toggleSupport"
  >
    <div class="counter-icon" :style="iconContainerStyles">
      <TernarySupportIcon
        v-if="isTernary"
        :support-value="supportValue"
        :size="iconSize"
      />
      <ThumbIcon
        v-else-if="isBinary"
        :supported="hasSupported"
        :size="iconSize"
      />
      <ThumbIcon
        v-else
        :supported="false"
        :size="iconSize"
        class="disabled-icon"
      />
    </div>
    <div 
      class="counter-content"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="support-count">
        <span class="counter-value" :style="{ fontSize: `${iconSize}px` }">
          {{ displayCount }}
        </span>
        <span v-if="showQuorum && quorumValue" class="quorum-compact" :style="{ fontSize: `${iconSize * 0.6}px` }">
          <span class="quorum-separator"> / </span>
          <span class="quorum-target">{{ quorumValue }}</span>
        </span>
      </div>
      <span class="counter-label" :style="{ fontSize: `${iconSize * 0.5}px` }">
        {{ t('agora', 'Supports') }}
      </span>
    </div>
    
    <!-- Simple tooltip only on number hover -->
    <div 
      v-if="showTooltip && isTernary && showDetailsOnHover" 
      class="support-tooltip"
      :style="tooltipStyles"
      @mouseenter="handleTooltipMouseEnter"
      @mouseleave="handleTooltipMouseLeave"
      @click.stop
    >
      <div class="ternary-support-tooltip">
        <div class="tooltip-content">
          <div class="tooltip-header">
            <h4 :style="{ fontSize: `${iconSize * 0.65}px` }">{{ tooltipTitle }}</h4>
          </div>
          
          <div class="support-breakdown">
            <div class="breakdown-item positive">
              <div class="breakdown-header">
                <TernarySupportIcon :support-value="1" :size="iconSize * 0.8" />
                <span class="breakdown-label" :style="{ fontSize: `${iconSize * 0.55}px` }">
                  {{ t('agora', 'In Favor') }}
                </span>
              </div>
              <div class="breakdown-counts">
                <span class="count" :style="{ fontSize: `${iconSize * 0.65}px` }">{{ positiveCount }}</span>
                <span class="percentage" :style="{ fontSize: `${iconSize * 0.45}px` }">
                  ({{ positivePercentage }}%)
                </span>
              </div>
              <div class="breakdown-bar">
                <div 
                  class="bar-fill" 
                  :style="{ width: `${positivePercentage}%` }"
                ></div>
              </div>
            </div>
            
            <div class="breakdown-item neutral">
              <div class="breakdown-header">
                <TernarySupportIcon :support-value="0" :size="iconSize * 0.8" />
                <span class="breakdown-label" :style="{ fontSize: `${iconSize * 0.55}px` }">
                  {{ t('agora', 'Neutral') }}
                </span>
              </div>
              <div class="breakdown-counts">
                <span class="count" :style="{ fontSize: `${iconSize * 0.65}px` }">{{ neutralCount }}</span>
                <span class="percentage" :style="{ fontSize: `${iconSize * 0.45}px` }">
                  ({{ neutralPercentage }}%)
                </span>
              </div>
              <div class="breakdown-bar">
                <div 
                  class="bar-fill" 
                  :style="{ width: `${neutralPercentage}%` }"
                ></div>
              </div>
            </div>
            
            <div class="breakdown-item negative">
              <div class="breakdown-header">
                <TernarySupportIcon :support-value="-1" :size="iconSize * 0.8" />
                <span class="breakdown-label" :style="{ fontSize: `${iconSize * 0.55}px` }">
                  {{ t('agora', 'Against') }}
                </span>
              </div>
              <div class="breakdown-counts">
                <span class="count" :style="{ fontSize: `${iconSize * 0.65}px` }">{{ negativeCount }}</span>
                <span class="percentage" :style="{ fontSize: `${iconSize * 0.45}px` }">
                  ({{ negativePercentage }}%)
                </span>
              </div>
              <div class="breakdown-bar">
                <div 
                  class="bar-fill" 
                  :style="{ width: `${negativePercentage}%` }"
                ></div>
              </div>
            </div>
          </div>
          
          <div class="support-summary">
            <div class="summary-item">
              <span class="summary-label" :style="{ fontSize: `${iconSize * 0.45}px` }">
                {{ t('agora', 'Total Participants') }}
              </span>
              <span class="summary-value" :style="{ fontSize: `${iconSize * 0.6}px` }">
                {{ totalParticipants }}
              </span>
            </div>
            <div v-if="quorumValue" class="summary-item">
              <span class="summary-label" :style="{ fontSize: `${iconSize * 0.45}px` }">
                {{ t('agora', 'Quorum Required') }}
              </span>
              <span class="summary-value" :style="{ fontSize: `${iconSize * 0.6}px` }">
                {{ quorumValue }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { useSupportsStore } from '../../stores/supports'
import { useSessionStore } from '../../stores/session'
import TernarySupportIcon from '../../components/AppIcons/modules/TernarySupportIcon.vue'
import ThumbIcon from '../../components/AppIcons/modules/ThumbIcon.vue'
import { Inquiry, Option } from '../../Types/index.ts'
import {
    canSupportOption,
    canSupport as canSupportInquiry
} from '../../utils/permissions.ts'



interface Props {
  item: Inquiry | Option
  itemType: 'inquiry' | 'option'
  context?: any
  showQuorum?: boolean
  viewOnly?: boolean
  showDetailsOnHover?: boolean
  iconSize?: number
  tooltipTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  showQuorum: false,
  showDetailsOnHover: true,
  iconSize: 22,
  tooltipTitle: t('agora', 'Support Breakdown'),
  context: () => ({}),
  viewOnly: false  
})

// Refs
const containerRef = ref<HTMLElement>()
const showTooltip = ref(false)
const tooltipHovered = ref(false)
const tooltipTimeout = ref<NodeJS.Timeout | null>(null)

// Computed properties for dynamic sizing
const containerStyles = computed(() => ({
    padding: `${props.iconSize * 0.3}px ${props.iconSize * 0.6}px`,
    gap: `${props.iconSize * 0.5}px`,
    borderRadius: `${props.iconSize * 0.6}px`,
    borderWidth: `${props.iconSize * 0.05}px`
  }))

const iconContainerStyles = computed(() => ({
    width: `${props.iconSize * 1.2}px`,
    height: `${props.iconSize * 1.2}px`,
    borderRadius: `${props.iconSize * 0.3}px`
  }))

const tooltipStyles = computed(() => ({
    minWidth: `${props.iconSize * 12}px`,
    maxWidth: `${props.iconSize * 14}px`
  }))

const isTernary = computed(() => props.item?.configuration?.supportFeature === 'ternary')

const isBinary = computed(() => props.item?.configuration?.supportFeature === 'binary')

const supportValue = computed(() => props.item?.currentUserStatus?.supportValue ?? null)

const hasSupported = computed(() => props.item?.currentUserStatus?.hasSupported ?? false)

const displayCount = computed(() => props.item?.status?.countSupports ?? 0)

const quorumValue = computed(() => props.item?.miscFields?.quorum ?? 0)

const positiveCount = computed(() => props.item?.status?.countPositiveSupports ?? 0)

const neutralCount = computed(() => props.item?.status?.countNeutralSupports ?? 0)

const negativeCount = computed(() => props.item?.status?.countNegativeSupports ?? 0)

const totalParticipants = computed(() => props.item?.status?.countParticipants ?? 
    (positiveCount.value + neutralCount.value + negativeCount.value))

const positivePercentage = computed(() => {
  if (totalParticipants.value === 0) return 0
  return Math.round((positiveCount.value / totalParticipants.value) * 100)
})

const neutralPercentage = computed(() => {
  if (totalParticipants.value === 0) return 0
  return Math.round((neutralCount.value / totalParticipants.value) * 100)
})

const negativePercentage = computed(() => {
  if (totalParticipants.value === 0) return 0
  return Math.round((negativeCount.value / totalParticipants.value) * 100)
})

const canSupport = computed(() => {
  if (!props.item) return false
  
  // props.context should never be undefined due to default value
  if (props.itemType === 'option') {
    return canSupportOption(props.context)
  } 
    return canSupportInquiry(props.context)
  
})


const handleMouseEnter = () => {
  if (!props.showDetailsOnHover || !isTernary.value) return
  
  clearTimeouts()
  
  tooltipTimeout.value = setTimeout(() => {
    showTooltip.value = true
  }, 300)
}

const handleMouseLeave = () => {
  clearTimeouts()
  
  if (!tooltipHovered.value) {
    tooltipTimeout.value = setTimeout(() => {
      showTooltip.value = false
    }, 150)
  }
}

const handleTooltipMouseEnter = () => {
  tooltipHovered.value = true
  clearTimeouts()
}

const handleTooltipMouseLeave = () => {
  tooltipHovered.value = false
  clearTimeouts()
  
  tooltipTimeout.value = setTimeout(() => {
    showTooltip.value = false
  }, 150)
}

const clearTimeouts = () => {
  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
    tooltipTimeout.value = null
  }
}

const toggleSupport = async () => {
  if (!canSupport.valuei || props.viewOnly) {
    return
  }
  
  // Store the current state before toggling
  const hadSupportedBefore = props.item.currentUserStatus.hasSupported

  try {
    const supportsStore = useSupportsStore()
    const sessionStore = useSessionStore()
     
    await supportsStore.toggleSupport(
      props.item.id, 
      sessionStore.currentUser.id, 
      props.item, 
      props.itemType
    )

    // Get the updated state after toggling
    const hasSupportedAfter = props.item.currentUserStatus.hasSupported
    const supportValueAfter = props.item.currentUserStatus.supportValue

    // Show success message
    if (props.item.configuration.supportFeature === 'binary') {
      if (hasSupportedAfter && !hadSupportedBefore) {
        showSuccess(t('agora', 'Inquiry supported, thanks for your support!'), { timeout: 2000 })
      } else if (!hasSupportedAfter && hadSupportedBefore) {
        showSuccess(t('agora', 'Inquiry support removed!'), { timeout: 2000 })
      }
    }
    else if (props.item.configuration.supportFeature === 'ternary') {
      if (supportValueAfter === 1) {
        showSuccess(t('agora', 'Inquiry supported, thanks for your support!'), { timeout: 2000 })
      } else if (supportValueAfter === 0) {
        showSuccess(t('agora', 'Neutral position saved!'), { timeout: 2000 })
      } else if (supportValueAfter === -1) {
        showSuccess(t('agora', 'Against position saved!'), { timeout: 2000 })
      } else if (supportValueAfter === null && hadSupportedBefore) {
        showSuccess(t('agora', 'Participation removed!'), { timeout: 2000 })
      }
    }

  } catch (error) {
    console.error('Failed to toggle support:', error)
    showError(t('agora', 'Failed to update support status'))
  }
}

// Cleanup
onUnmounted(() => {
  clearTimeouts()
})
</script>

 <style lang="scss" scoped>
.counter-item.supports {
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  position: relative;
  user-select: none;
  white-space: nowrap;
  height: 32px; 
  min-width: auto; 
  
  &.clickable {
    cursor: pointer;
    
    &:hover {
      border-color: var(--color-success);
      background: var(--color-background-darker);
      
      &.has-support {
        border-color: var(--color-success);
      }
    }
  }
  
  &.disabled {
    cursor: default;
    opacity: 0.6;
    
    .counter-icon .disabled-icon {
      opacity: 0.5;
    }
  }
  
  .counter-icon {
    background: linear-gradient(135deg, var(--color-background-darker), var(--color-background-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px; 
    height: 32px; 
    border-radius: 8px; 
  }
  
  .counter-content {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    height: 100%;
    justify-content: center; 
    
    .support-count {
      display: flex;
      align-items: baseline;
      line-height: 1; 
      
      .counter-value {
        font-weight: 700;
        color: var(--color-main-text);
        line-height: 1;
        font-size: 12px !important; 
      }
      
      .quorum-compact {
        color: var(--color-text-lighter);
        line-height: 1;
        
        .quorum-target {
          color: var(--color-primary-element);
          font-weight: 600;
          font-size: 10px; 
        }
      }
    }
    
    .counter-label {
      color: var(--color-text-lighter);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      line-height: 1.2;
      font-size: 10px !important; 
      margin-top: 2px; 
    }
  } 

  .support-tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    pointer-events: auto;
    margin-top: 4px;
    
    /* Arrow pointer */
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid var(--color-border);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid var(--color-main-background);
    }
    
    .ternary-support-tooltip {
      background: var(--color-main-background);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      
      .tooltip-content {
        padding: 12px;
        background: var(--color-main-background);
      }
      
      .tooltip-header {
        margin-bottom: 12px;
        
        h4 {
          margin: 0;
          font-weight: 600;
          color: var(--color-main-text);
          line-height: 1.2;
        }
      }
      
      .support-breakdown {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }
      
      .breakdown-item {
        padding: 8px;
        border-radius: 6px;
        background: var(--color-background-dark);
        
        &.positive {
          border-left: 3px solid #10b981;
        }
        
        &.neutral {
          border-left: 3px solid #6b7280;
        }
        
        &.negative {
          border-left: 3px solid #ef4444;
        }
      }
      
      .breakdown-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
        
        .breakdown-label {
          font-weight: 600;
          color: var(--color-main-text);
          line-height: 1.2;
        }
      }
      
      .breakdown-counts {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 4px;
        
        .count {
          font-weight: 700;
          line-height: 1;
        }
        
        .percentage {
          color: var(--color-text-lighter);
          line-height: 1;
        }
      }
      
      .breakdown-bar {
        height: 3px;
        background: var(--color-border);
        border-radius: 1.5px;
        overflow: hidden;
        
        .bar-fill {
          height: 100%;
          transition: width 0.3s ease;
          
          .positive & {
            background: #10b981;
          }
          
          .neutral & {
            background: #6b7280;
          }
          
          .negative & {
            background: #ef4444;
          }
        }
      }
      
      .support-summary {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        border-top: 1px solid var(--color-border);
        gap: 16px;
        
        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          
          .summary-label {
            color: var(--color-text-lighter);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .summary-value {
            font-weight: 700;
            color: var(--color-main-text);
            line-height: 1;
          }
        }
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .counter-item.supports {
    .support-tooltip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90vw;
      max-width: 320px;
      z-index: 99999;
      
      &::before,
      &::after {
        display: none;
      }
      
      .ternary-support-tooltip {
        max-width: 100%;
      }
    }
  }
}
</style>
