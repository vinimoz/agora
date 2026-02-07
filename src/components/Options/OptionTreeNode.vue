<!--
    SPDX-FileCopyrightText: 2024 Nextcloud contributors
-->
<template>
    <div class="book-view">
        <div class="book-container">
            <!-- Left sidebar - Table of Contents -->
            <div class="table-of-contents">
                <div class="toc-header">
                    <h3>{{ t('agora', 'Table of Contents') }}</h3>
                </div>
                <div class="toc-list">
                    <!-- Show only structure family options (2 levels max) -->
                    <div 
                     v-for="node in structureRootOptions" 
                     :key="node.id"
                     class="toc-item"
                     :class="{ 
                             'active': activeNodeId === node.id,
                             'depth-0': getDepth(node) === 0
                             }"
                     @click="setActiveNode(node)"
                     >
                     <!-- Level 1: Root nodes -->
                        <div class="toc-item-content">
                            <div class="toc-icon">
                                <component :is="getOptionTypeIcon(node.type)" :size="16" />
                            </div>
                            <div class="toc-text">
                                <div class="toc-title-display">
                                    <div class="toc-title">
                                        {{ displayNodeTitle(node) }}
                                    </div>
                                    <div class="toc-subtitle">
                                        {{ getOptionTypeLabel(node.type) }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Level 2: Direct children (limit to 2 levels in TOC) -->
                        <div v-if="getChildren(node.id).length > 0" class="toc-children">
                            <div 
                                 v-for="child in getChildren(node.id)" 
                                 :key="child.id"
                                 class="toc-item child"
                                 :class="{ 'active': activeNodeId === child.id }"
                                 @click.stop="setActiveNode(child)"
                                 >
                                 <div class="toc-item-content">
                                     <div class="toc-icon">
                                         <component :is="getOptionTypeIcon(child.type)" :size="14" />
                                     </div>
                                     <div class="toc-text">
                                         <div class="toc-title-display">
                                             <div class="toc-title">
                                                 {{ displayNodeTitle(child) }}
                                             </div>
                                             <div class="toc-subtitle">
                                                 {{ getOptionTypeLabel(child.type) }}
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div v-if="structureRootOptions.length === 0" class="toc-empty">
                        <component :is="InquiryOptionIcons.BookOpenVariant" :size="32" />
                        <p>{{ t('agora', 'No content yet') }}</p>
                        <NcButton 
                            type="tertiary"
                            @click="openAddOptionModalForRoot()"
                            >
                            {{ t('agora', 'Create first {type}', { type: getRootTypeLabel() }) }}
                        </NcButton>
                    </div>
                </div>
            </div>

            <!-- Right pane - Book content -->
            <div class="book-content">
                <!-- When a node is active, show its content -->
                <div v-if="activeNode" class="content-panel">
                    <!-- Content header -->
                    <div class="content-header">
                        <div class="content-title-area">
                            <!-- Title display -->
                            <div class="title-display">
                                <h2>
                                    {{ displayNodeTitle(activeNode) }}
                                </h2>
                                <h3 v-if="activeNode.text && activeNode.text.trim()">
                                    {{ activeNode.text }}
                                </h3>
                                <div class="title-meta">
                                    <span class="type-label">{{ getOptionTypeLabel(activeNode.type) }}</span>
                                    <span class="created-date">{{ formatDate(activeNode.status?.created) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Content area -->
                    <div class="content-body">
                        <!-- Content display -->
                        <div class="content-display">
                            <div class="text-content">
                                <div v-if="activeNode.text && activeNode.text.trim()" class="text-text" v-html="formattedContent"></div>
                                <div v-else class="empty-content">
                                    <p>{{ t('agora', 'No content yet') }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Support and Comments -->
                        <div class="support-comments-footer">
                            <!-- Support feature -->
                            <div v-if="hasSupportFeature(activeNode)" class="support-section">
                                <SupportFeature
                                    :item="activeNode"
                                    item-type="option"
                                    :show-quorum="false"
                                    :icon-size="16"
                                />
                            </div>

                            <!-- Comment feature -->
                            <div v-if="allowComments(activeNode)" class="comments-section">
                                <div class="comment-count" @click="openNodeDetail(activeNode)">
                                    <component :is="InquiryOptionIcons.Comment" :size="16" />
                                    <span>{{ activeNode.status?.countComments || 0 }}</span>
                                </div>
                                <NcButton
                                    type="tertiary"
                                    size="small"
                                    @click="openNodeDetail(activeNode)"
                                >
                                    {{ t('agora', 'Comments') }}
                                </NcButton>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Always show structure layout with all structure family options -->

                <!-- STRUCTURE LAYOUT -->
                <div class="structure-layout">
                    <div class="structure-tree">
                        <!-- Hierarchical tree view showing all structure options (3 levels max) -->
                        <div v-for="rootNode in structureRootOptions" :key="rootNode.id" class="structure-level">
                            <!-- Level 1: Root nodes (e.g., Chapter1, Introduction) -->
                            <div 
                                class="structure-node level-1" 
                                :class="{ 
                                    'active': activeNodeId === rootNode.id,
                                    'editing': editingNodeId === rootNode.id,
                                    'has-children': getChildren(rootNode.id).length > 0
                                }"
                                @click="!editingNodeId && setActiveNode(rootNode)"
                            >
                                <div class="node-header">
                                    <div class="node-icon-title">
                                        <component :is="getOptionTypeIcon(rootNode.type)" :size="18" class="node-icon" />
                                        <div class="node-content">
                                            <div class="node-title-row">
                                                <!-- Edit mode - FULL WIDTH -->
                                                <div v-if="editingNodeId === rootNode.id" class="inline-edit-full">
                                                    <div class="edit-section">
                                                        <label class="edit-label">{{ t('agora', 'Title') }}</label>
                                                        <NcRichContenteditable
                                                            v-model="inlineEditTitle"
                                                            :emojiAutocomplete="true"
                                                            :linkAutocomplete="true"
                                                            :autolink="true"
                                                            :use-markdown="true"
                                                            :placeholder="t('agora', 'Enter title')"
                                                            class="edit-input title-input"
                                                            autofocus
                                                        />
                                                    </div>

                                                    <div class="edit-section">
                                                        <label class="edit-label">{{ t('agora', 'Description') }}</label>
                                                        <NcRichContenteditable
                                                            v-model="inlineEditText"
                                                            :emojiAutocomplete="true"
                                                            :linkAutocomplete="true"
                                                            :autolink="true"
                                                            :use-markdown="true"
                                                            :multiline="true"
                                                            :placeholder="t('agora', 'Enter description')"
                                                            class="edit-input text-input"
                                                            rows="3"
                                                        />
                                                    </div>

                                                    <div class="edit-actions-full">
                                                        <NcButton 
                                                            type="primary" 
                                                            size="small"
                                                            @click.stop="saveInlineEdit(rootNode)"
                                                        >
                                                            {{ t('agora', 'Save') }}
                                                        </NcButton>
                                                        <NcButton 
                                                            type="tertiary" 
                                                            size="small"
                                                            @click.stop="cancelInlineEdit"
                                                        >
                                                            {{ t('agora', 'Cancel') }}
                                                        </NcButton>
                                                    </div>
                                                </div>

                                                <!-- Display mode -->
                                                <div v-else class="display-mode">
                                                    <h3 class="node-title" @click.stop="setActiveNode(rootNode)">
                                                        {{ displayNodeTitle(rootNode) || t('agora', 'Untitled') }}
                                                    </h3>

                                                    <div v-if="rootNode.text && rootNode.text.trim()" class="node-preview">
                                                        <p class="node-text-preview" @click.stop="setActiveNode(rootNode)">
                                                            {{ truncateText(rootNode.text, 100) }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Quick actions and meta -->
                                            <div class="node-meta-actions">
                                                <div class="node-meta">
                                                    <span class="node-type">{{ getOptionTypeLabel(rootNode.type) }}</span>
                                                    <span class="node-date">{{ formatDate(rootNode.status?.created) }}</span>

                                                    <!-- Support and comments inline -->
                                                    <div class="node-interactions">
                                                        <div v-if="hasSupportFeature(rootNode) && canSupportNode(rootNode)" class="node-support-inline">
                                                            <SupportFeature
                                                                :item="rootNode"
                                                                item-type="option"
                                                                :show-quorum="false"
                                                                :icon-size="16"
                                                                :compact="true"
                                                                class="support-feature-compact"
                                                            />
                                                        </div>
                                                        <div v-if="allowComments(rootNode)" class="node-comments-inline" @click.stop="openNodeDetail(rootNode)">
                                                            <component :is="InquiryOptionIcons.Comment" :size="12" />
                                                            <span>{{ rootNode.status?.countComments || 0 }}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Quick actions -->
                                                <div v-if="editingNodeId !== rootNode.id" class="node-quick-actions">
                                                    <NcButton 
                                                        v-if="canEditNode(rootNode)"
                                                        type="tertiary-no-background" 
                                                        size="small"
                                                        @click.stop="startInlineEdit(rootNode)"
                                                        :title="t('agora', 'Edit')"
                                                    >
                                                        <template #icon>
                                                            <component :is="InquiryOptionIcons.Pencil" :size="12" />
                                                        </template>
                                                    </NcButton>
                                                    <NcButton 
                                                        type="tertiary-no-background" 
                                                        size="small"
                                                        @click.stop="openNodeDetail(rootNode)"
                                                        :title="t('agora', 'Details')"
                                                    >
                                                        <template #icon>
                                                            <component :is="InquiryOptionIcons.Comment" :size="12" />
                                                        </template>
                                                    </NcButton>

                                                    <!-- Add child button - shows on hover 
                                                    <NcButton 
                                                        v-if="canAddChild(rootNode)"
                                                        type="tertiary-no-background" 
                                                        size="small"
                                                        @click.stop="openAddOptionModalForNode(rootNode)"
                                                        :title="t('agora', 'Add response')"
                                                        class="add-child-btn"
                                                    >
                                                        <template #icon>
                                                            <component :is="InquiryOptionIcons.Plus" :size="12" />
                                                        </template>
                                                    </NcButton> -->
                                                </div>
                                            </div>

                                            <!-- Allowed responses hover panel -->
                                            <div v-if="hasAllowedResponses(rootNode) && !editingNodeId" class="allowed-responses-hover">
                                                <div class="responses-header">
                                                    <component :is="InquiryOptionIcons.MessageReplyText" :size="12" />
                                                    <span class="responses-title">{{ t('agora', 'Add response') }}</span>
                                                </div>

                                                <div class="responses-options">
                                                    <NcButton
                                                        v-for="responseType in getAllowedResponseTypes(rootNode.type)"
                                                        :key="responseType"
                                                        type="tertiary"
                                                        size="small"
                                                        @click.stop="openAddOptionModal(responseType, rootNode.id)"
                                                        class="response-type-btn"
                                                    >
                                                        <template #icon>
                                                            <component :is="getOptionTypeIcon(responseType)" :size="12" />
                                                        </template>
                                                        {{ getOptionTypeLabel(responseType) }}
                                                    </NcButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Level 2: Direct children (e.g., Article1, Section1, Article2) -->
                                <div v-if="getChildren(rootNode.id).length > 0" class="structure-children">
                                    <div 
                                        v-for="child in getChildren(rootNode.id)" 
                                        :key="child.id" 
                                        class="structure-node level-2"
                                        :class="{ 
                                            'active': activeNodeId === child.id,
                                            'editing': editingNodeId === child.id,
                                            'has-children': getChildren(child.id).length > 0
                                        }"
                                        @click.stop="!editingNodeId && setActiveNode(child)"
                                    >
                                        <div class="node-header">
                                            <div class="node-icon-title">
                                                <component :is="getOptionTypeIcon(child.type)" :size="16" class="node-icon" />
                                                <div class="node-content">
                                                    <div class="node-title-row">
                                                        <!-- Edit mode - FULL WIDTH -->
                                                        <div v-if="editingNodeId === child.id" class="inline-edit-full">
                                                            <div class="edit-section">
                                                                <label class="edit-label">{{ t('agora', 'Title') }}</label>
                                                                <NcRichContenteditable
                                                                    v-model="inlineEditTitle"
                                                                    :emojiAutocomplete="true"
                                                                    :linkAutocomplete="true"
                                                                    :autolink="true"
                                                                    :use-markdown="true"
                                                                    :placeholder="t('agora', 'Enter title')"
                                                                    class="edit-input title-input"
                                                                    autofocus
                                                                />
                                                            </div>

                                                            <div class="edit-section">
                                                                <label class="edit-label">{{ t('agora', 'Description') }}</label>
                                                                <NcRichContenteditable
                                                                    v-model="inlineEditText"
                                                                    :emojiAutocomplete="true"
                                                                    :linkAutocomplete="true"
                                                                    :autolink="true"
                                                                    :use-markdown="true"
                                                                    :multiline="true"
                                                                    :placeholder="t('agora', 'Enter description')"
                                                                    class="edit-input text-input"
                                                                    rows="3"
                                                                />
                                                            </div>

                                                            <div class="edit-actions-full">
                                                                <NcButton 
                                                                    type="primary" 
                                                                    size="small"
                                                                    @click.stop="saveInlineEdit(child)"
                                                                >
                                                                    {{ t('agora', 'Save') }}
                                                                </NcButton>
                                                                <NcButton 
                                                                    type="tertiary" 
                                                                    size="small"
                                                                    @click.stop="cancelInlineEdit"
                                                                >
                                                                    {{ t('agora', 'Cancel') }}
                                                                </NcButton>
                                                            </div>
                                                        </div>

                                                        <!-- Display mode -->
                                                        <div v-else class="display-mode">
                                                            <h4 class="node-title" @click.stop="setActiveNode(child)">
                                                                {{ displayNodeTitle(child) || t('agora', 'Untitled') }}
                                                            </h4>

                                                            <div v-if="child.text && child.text.trim()" class="node-preview">
                                                                <p class="node-text-preview" @click.stop="setActiveNode(child)">
                                                                    {{ truncateText(child.text, 80) }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- Quick actions and meta -->
                                                    <div class="node-meta-actions">
                                                        <div class="node-meta">
                                                            <span class="node-type">{{ getOptionTypeLabel(child.type) }}</span>
                                                            <span class="node-date">{{ formatDate(child.status?.created) }}</span>

                                                            <!-- Support and comments inline -->
                                                            <div class="node-interactions">
                                                                <div v-if="hasSupportFeature(child) && canSupportNode(child)" class="node-support-inline">
                                                                    <SupportFeature
                                                                        :item="child"
                                                                        item-type="option"
                                                                        :show-quorum="false"
                                                                        :icon-size="16"
                                                                        :compact="true"
                                                                        class="support-feature-compact"
                                                                    />
                                                                </div>
                                                                <div v-if="allowComments(child)" class="node-comments-inline" @click.stop="openNodeDetail(child)">
                                                                    <component :is="InquiryOptionIcons.Comment" :size="12" />
                                                                    <span>{{ child.status?.countComments || 0 }}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Quick actions -->
                                                        <div v-if="editingNodeId !== child.id" class="node-quick-actions">
                                                            <NcButton 
                                                                v-if="canEditNode(child)"
                                                                type="tertiary-no-background" 
                                                                size="small"
                                                                @click.stop="startInlineEdit(child)"
                                                                :title="t('agora', 'Edit')"
                                                            >
                                                                <template #icon>
                                                                    <component :is="InquiryOptionIcons.Pencil" :size="12" />
                                                                </template>
                                                            </NcButton>
                                                            <NcButton 
                                                                type="tertiary-no-background" 
                                                                size="small"
                                                                @click.stop="openNodeDetail(child)"
                                                                :title="t('agora', 'Details')"
                                                            >
                                                                <template #icon>
                                                                    <component :is="InquiryOptionIcons.Comment" :size="12" />
                                                                </template>
                                                            </NcButton>

                                                            <!-- Add child button - shows on hover 
                                                            <NcButton 
                                                                v-if="canAddChild(child)"
                                                                type="tertiary-no-background" 
                                                                size="small"
                                                                @click.stop="openAddOptionModalForNode(child)"
                                                                :title="t('agora', 'Add response')"
                                                                class="add-child-btn"
                                                            >
                                                                <template #icon>
                                                                    <component :is="InquiryOptionIcons.Plus" :size="12" />
                                                                </template>
                                                            </NcButton> -->
                                                        </div>
                                                    </div>

                                                    <!-- Allowed responses hover panel -->
                                                    <div v-if="hasAllowedResponses(child) && !editingNodeId" class="allowed-responses-hover">
                                                        <div class="responses-header">
                                                            <component :is="InquiryOptionIcons.MessageReplyText" :size="12" />
                                                            <span class="responses-title">{{ t('agora', 'Add response') }}</span>
                                                        </div>

                                                        <div class="responses-options">
                                                            <NcButton
                                                                v-for="responseType in getAllowedResponseTypes(child.type)"
                                                                :key="responseType"
                                                                type="tertiary"
                                                                size="small"
                                                                @click.stop="openAddOptionModal(responseType, child.id)"
                                                                class="response-type-btn"
                                                            >
                                                                <template #icon>
                                                                    <component :is="getOptionTypeIcon(responseType)" :size="12" />
                                                                </template>
                                                                {{ getOptionTypeLabel(responseType) }}
                                                            </NcButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Level 3: Children of children (e.g., Amendment1, Subsection, etc.) -->
                                        <div v-if="getChildren(child.id).length > 0" class="structure-children">
                                            <div 
                                                v-for="grandChild in getChildren(child.id)" 
                                                :key="grandChild.id" 
                                                class="structure-node level-3"
                                                :class="{ 
                                                    'active': activeNodeId === grandChild.id,
                                                    'editing': editingNodeId === grandChild.id
                                                }"
                                                @click.stop="!editingNodeId && setActiveNode(grandChild)"
                                            >
                                                <div class="node-header">
                                                    <div class="node-icon-title">
                                                        <component :is="getOptionTypeIcon(grandChild.type)" :size="14" class="node-icon" />
                                                        <div class="node-content">
                                                            <div class="node-title-row">
                                                                <!-- Edit mode - FULL WIDTH -->
                                                                <div v-if="editingNodeId === grandChild.id" class="inline-edit-full">
                                                                    <div class="edit-section">
                                                                        <label class="edit-label">{{ t('agora', 'Title') }}</label>
                                                                        <NcRichContenteditable
                                                                            v-model="inlineEditTitle"
                                                                            :emojiAutocomplete="true"
                                                                            :linkAutocomplete="true"
                                                                            :autolink="true"
                                                                            :use-markdown="true"
                                                                            :placeholder="t('agora', 'Enter title')"
                                                                            class="edit-input title-input"
                                                                            autofocus
                                                                        />
                                                                    </div>

                                                                    <div class="edit-section">
                                                                        <label class="edit-label">{{ t('agora', 'Description') }}</label>
                                                                        <NcRichContenteditable
                                                                            v-model="inlineEditText"
                                                                            :emojiAutocomplete="true"
                                                                            :linkAutocomplete="true"
                                                                            :autolink="true"
                                                                            :use-markdown="true"
                                                                            :multiline="true"
                                                                            :placeholder="t('agora', 'Enter description')"
                                                                            class="edit-input text-input"
                                                                            rows="3"
                                                                        />
                                                                    </div>

                                                                    <div class="edit-actions-full">
                                                                        <NcButton 
                                                                            type="primary" 
                                                                            size="small"
                                                                            @click.stop="saveInlineEdit(grandChild)"
                                                                        >
                                                                            {{ t('agora', 'Save') }}
                                                                        </NcButton>
                                                                        <NcButton 
                                                                            type="tertiary" 
                                                                            size="small"
                                                                            @click.stop="cancelInlineEdit"
                                                                        >
                                                                            {{ t('agora', 'Cancel') }}
                                                                        </NcButton>
                                                                    </div>
                                                                </div>

                                                                <!-- Display mode -->
                                                                <div v-else class="display-mode">
                                                                    <h5 class="node-title" @click.stop="setActiveNode(grandChild)">
                                                                        {{ displayNodeTitle(grandChild) || t('agora', 'Untitled') }}
                                                                    </h5>

                                                                    <div v-if="grandChild.text && grandChild.text.trim()" class="node-preview">
                                                                        <p class="node-text-preview" @click.stop="setActiveNode(grandChild)">
                                                                            {{ truncateText(grandChild.text, 60) }}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Quick actions and meta -->
                                                            <div class="node-meta-actions">
                                                                <div class="node-meta">
                                                                    <span class="node-type">{{ getOptionTypeLabel(grandChild.type) }}</span>
                                                                    <span class="node-date">{{ formatDate(grandChild.status?.created) }}</span>

                                                                    <!-- Support and comments inline -->
                                                                    <div class="node-interactions">
                                                                        <div v-if="hasSupportFeature(grandChild) && canSupportNode(grandChild)" class="node-support-inline">
                                                                            <SupportFeature
                                                                                :item="grandChild"
                                                                                item-type="option"
                                                                                :show-quorum="false"
                                                                                :icon-size="16"
                                                                                :compact="true"
                                                                                class="support-feature-compact"
                                                                            />
                                                                        </div>
                                                                        <div v-if="allowComments(grandChild)" class="node-comments-inline" @click.stop="openNodeDetail(grandChild)">
                                                                            <component :is="InquiryOptionIcons.Comment" :size="12" />
                                                                            <span>{{ grandChild.status?.countComments || 0 }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <!-- Quick actions -->
                                                                <div v-if="editingNodeId !== grandChild.id" class="node-quick-actions">
                                                                    <NcButton 
                                                                        v-if="canEditNode(grandChild)"
                                                                        type="tertiary-no-background" 
                                                                        size="small"
                                                                        @click.stop="startInlineEdit(grandChild)"
                                                                        :title="t('agora', 'Edit')"
                                                                    >
                                                                        <template #icon>
                                                                            <component :is="InquiryOptionIcons.Pencil" :size="12" />
                                                                        </template>
                                                                    </NcButton>
                                                                    <NcButton 
                                                                        type="tertiary-no-background" 
                                                                        size="small"
                                                                        @click.stop="openNodeDetail(grandChild)"
                                                                        :title="t('agora', 'Details')"
                                                                    >
                                                                        <template #icon>
                                                                            <component :is="InquiryOptionIcons.Comment" :size="12" />
                                                                        </template>
                                                                    </NcButton>

                                                                    <!-- Add child button - shows on hover (if allowed for level 3) -
                                                                    <NcButton 
                                                                        v-if="canAddChild(grandChild)"
                                                                        type="tertiary-no-background" 
                                                                        size="small"
                                                                        @click.stop="openAddOptionModalForNode(grandChild)"
                                                                        :title="t('agora', 'Add response')"
                                                                        class="add-child-btn"
                                                                    >
                                                                        <template #icon>
                                                                            <component :is="InquiryOptionIcons.Plus" :size="12" />
                                                                        </template>
                                                                    </NcButton> -->
                                                                </div>
                                                            </div>

                                                            <!-- Allowed responses hover panel -->
                                                            <div v-if="hasAllowedResponses(grandChild) && !editingNodeId" class="allowed-responses-hover">
                                                                <div class="responses-header">
                                                                    <component :is="InquiryOptionIcons.MessageReplyText" :size="12" />
                                                                    <span class="responses-title">{{ t('agora', 'Add response') }}</span>
                                                                </div>

                                                                <div class="responses-options">
                                                                    <NcButton
                                                                        v-for="responseType in getAllowedResponseTypes(grandChild.type)"
                                                                        :key="responseType"
                                                                        type="tertiary"
                                                                        size="small"
                                                                        @click.stop="openAddOptionModal(responseType, grandChild.id)"
                                                                        class="response-type-btn"
                                                                    >
                                                                        <template #icon>
                                                                            <component :is="getOptionTypeIcon(responseType)" :size="12" />
                                                                        </template>
                                                                        {{ getOptionTypeLabel(responseType) }}
                                                                    </NcButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div v-if="structureRootOptions.length === 0" class="structure-empty">
                        <component :is="InquiryOptionIcons.BookOpenVariant" :size="48" />
                        <p>{{ t('agora', 'No chapters yet') }}</p>
                        <NcButton 
                            type="primary"
                            @click="openAddOptionModalForRoot()"
                        >
                            <template #icon>
                                <component :is="getOptionTypeIcon(getRootType())" :size="16" />
                            </template>
                            {{ t('agora', 'Create first {type}', { type: getRootTypeLabel() }) }}
                        </NcButton>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <OptionDetailModal
            v-if="showDetailModal && selectedNode"
            :option-id="selectedNode.id"
            :inquiry-id="inquiryId"
            @close="closeDetailModal"
            @updated="handleNodeUpdated"
            @deleted="handleNodeDeleted"
        />

        <AddOptionModal
            v-if="showAddOptionModal"
            :inquiry-id="inquiryId"
            :option-type="selectedOptionTypeKey"
            :parent-id="selectedParentId"
            @close="closeAddOptionModal"
            @created="handleOptionCreated"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'
import SupportFeature from '../../helpers/modules/SupportFeature.vue'
import { DateTime } from 'luxon'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { useSupportsStore } from '../../stores/supports'
import { useOptionStore } from '../../stores/option'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { getOptionTypeData } from '../../helpers/modules/InquiryOptionHelper'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { 
    createOptionContext,
    canEditOption,
    canDeleteOption,
    canCommentOption,
    canSupportOption
} from '../../utils/permissions.ts'

// Types
import type { Option, OptionType, OptionStoreLike } from '../../Types/index.ts'

import AddOptionModal from './AddOptionModal.vue'
import OptionDetailModal from './OptionDetailModal.vue'

// Props
interface Props {
  inquiryId: number
  useTitle?: boolean
  useDescription?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  useTitle: true,
  useDescription: true
})

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()
const supportsStore = useSupportsStore()
const optionStore = useOptionStore()

// State - FIXED: Initialize with empty strings to prevent undefined
const activeNodeId = ref<number | null>(null)
const selectedNode = ref<Option | null>(null)
const editingNodeId = ref<number | null>(null)
const inlineEditTitle = ref<string>('')
const inlineEditText = ref<string>('')

const showAddOptionModal = ref(false)
const showDetailModal = ref(false)
const selectedOptionTypeKey = ref<string | null>(null)
const selectedParentId = ref<number | null>(null)

// Get all option types
const allOptionTypes = computed<OptionType[]>(() => {
  return sessionStore.appSettings?.inquiryOptionTypeTab || []
})

// Create context for active node
const activeNodeContext = computed(() => {
  if (!activeNode.value) return null

  const optionLike: OptionStoreLike = {
    owner: { id: activeNode.value.owner?.id || '' },
    type: activeNode.value.type,
    isDeleted: activeNode.value.isDeleted || false,
    isArchived: activeNode.value.isArchived || false,
  }

  return createOptionContext(optionLike)
})

// Get structure family types (filter by family 'structure')
const structureTypes = computed<OptionType[]>(() => {
  return allOptionTypes.value.filter(type => type.family === 'structure')
})

// Get root structure types
const rootStructureTypes = computed<OptionType[]>(() => {
  return structureTypes.value.filter(type => {
    // Types that can be root (e.g., chapter, introduction)
    return ['chapter', 'structure_intro'].includes(type.option_type) ||
           !allOptionTypes.value.some(parentType => 
             parentType.allowed_response?.includes(type.option_type)
           )
  })
})

// Get only structure family root options
const structureRootOptions = computed<Option[]>(() => {
  return optionsStore.options.filter(opt => {
    // Check if it's a structure family type and has no parent
    const typeData = getOptionTypeDataByType(opt.type)
    return typeData?.family === 'structure' && (!opt.parentId || opt.parentId === 0)
  })
})

const activeNode = computed<Option | null>(() => {
  if (!activeNodeId.value) return null
  return optionsStore.options.find(opt => opt.id === activeNodeId.value) || null
})

const formattedContent = computed(() => {
  if (!activeNode.value?.text || !activeNode.value.text.trim()) return ''
  return activeNode.value.text
    .trim()
    .replace(/\n/g, '<br>')
})

// Helper methods
const getOptionTypeDataForNode = (node: Option | null) => {
  if (!node) return null
  return getOptionTypeData(node.type, allOptionTypes.value, node.type)
}

const getOptionTypeDataByType = (type: string) => {
  return allOptionTypes.value.find(opt => 
    opt.option_type === type || opt.optionType === type
  )
}

const getOptionTypeLabel = (type: string): string => {
  const optionType = getOptionTypeDataByType(type)
  return optionType?.label || type
}

const getOptionTypeIcon = (type: string) => {
  const optionType = getOptionTypeDataByType(type)

  if (optionType?.icon) {
    const iconComponent = InquiryOptionIcons[optionType.icon as keyof typeof InquiryOptionIcons]
    return iconComponent || InquiryOptionIcons.File
  }
  return InquiryOptionIcons.File
}

const displayNodeTitle = (node: Option): string => {
  if (!node) return ''
  const typeData = getOptionTypeDataForNode(node)
  return typeData?.use_title ? (node.title || node.label) : node.label
}

const hasSupportFeature = (node: Option): boolean => {
  if (!node) return false

  const nodeOptionLike: OptionStoreLike = {
    owner: { id: node.owner?.id || '' },
    type: node.type,
    isDeleted: node.isDeleted || false,
    isArchived: node.isArchived || false,
  }

  const context = createOptionContext(nodeOptionLike)
  return canSupportOption(context)
}

const getChildren = (parentId: number): Option[] => {
  if (!optionsStore.options) return []
  return optionsStore.options.filter(opt => opt.parentId === parentId)
}

const getAllowedResponseTypes = (nodeType: string): string[] => {
  const typeData = getOptionTypeDataByType(nodeType)
  if (typeof typeData?.allowed_response === 'string') {
    try {
      return JSON.parse(typeData.allowed_response)
    } catch {
      return []
    }
  }
  return typeData?.allowed_response || []
}

const canAddChild = (node: Option): boolean => {
  if (!node) return false
  const allowedResponses = getAllowedResponseTypes(node.type)
  return allowedResponses.length > 0
}

const getRootType = (): string => {
  return rootStructureTypes.value[0]?.option_type || 'chapter'
}

const getRootTypeLabel = (): string => {
  return getOptionTypeLabel(getRootType())
}

const getDepth = (node: Option, depth = 0): number => {
  if (!node.parentId || node.parentId === 0) return depth
  const parent = optionsStore.options.find(opt => opt.id === node.parentId)
  if (!parent) return depth
  return getDepth(parent, depth + 1)
}

// Permission checks with safe access
const canEditNode = (node: Option): boolean => {
  if (!node) return false

  // Create a proper OptionStoreLike object
  const optionLike: OptionStoreLike = {
    owner: { id: node.owner?.id || '' },
    type: node.type,
    isDeleted: node.isDeleted || false,
    isArchived: node.isArchived || false,
  }

  const context = createOptionContext(optionLike)
  return canEditOption(context)
}

const canCommentOnNode = (node: Option): boolean => {
  if (!node) return false

  const safeNode: OptionStoreLike = {
    ...node,
    owner: node.owner || { id: sessionStore.currentUser?.id || '' }
  }

  const context = createOptionContext(safeNode)
  return canCommentOption(context)
}

const canSupportNode = (node: Option): boolean => {
  if (!node) return false

  const safeNode: OptionStoreLike = {
    ...node,
    owner: node.owner || { id: sessionStore.currentUser?.id || '' }
  }

  const context = createOptionContext(safeNode)
  return canSupportOption(context)
}

const allowComments = (node: Option): boolean => {
  if (!node) return false
  const typeData = getOptionTypeDataForNode(node)
  const hasCommentFeature = typeData?.allow_comment || false
  if (!hasCommentFeature) return false

  return canCommentOnNode(node)
}

const formatDate = (timestamp?: number): string => {
  if (!timestamp) return ''
  return DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Check if node has allowed responses
const hasAllowedResponses = (node: Option): boolean => {
  if (!node) return false
  const allowedResponses = getAllowedResponseTypes(node.type)
  return allowedResponses.length > 0
}

// Methods
const setActiveNode = (node: Option): void => {
  if (editingNodeId.value) return // Don't change active node while editing
  activeNodeId.value = node.id
  selectedNode.value = null
  editingNodeId.value = null
}

const startInlineEdit = (node: Option): void => {
  editingNodeId.value = node.id

  const title = displayNodeTitle(node)
  inlineEditTitle.value = title ? String(title) : ''

  const text = node.text
  inlineEditText.value = text ? String(text) : ''
}

const cancelInlineEdit = (): void => {
  editingNodeId.value = null
  inlineEditTitle.value = ''
  inlineEditText.value = ''
}

const saveInlineEdit = async (node: Option): Promise<void> => {
  try {
    // Use option store for backend update
    await optionStore.load(node.id)
    const updatedOption = await optionStore.update({
      id: node.id,
      title: inlineEditTitle.value || '',
      text: inlineEditText.value || '',
      type: node.type,
      parentId: node.parentId
    })
    
    // Update local store
    const index = optionsStore.options.findIndex(opt => opt.id === node.id)
    if (index >= 0) {
      optionsStore.options[index] = { ...optionsStore.options[index], ...updatedOption }
    }
    
    editingNodeId.value = null
    inlineEditTitle.value = ''
    inlineEditText.value = ''
    
    showSuccess(t('agora', 'Option updated'))
  } catch (error) {
    console.error('Error saving inline edit:', error)
    showError(t('agora', 'Failed to update option'))
  }
}

const toggleSupportForNode = async (node: Option): Promise<void> => {
  if (!node || !hasSupportFeature(node) || !sessionStore.currentUser?.id) return

  // Check permission
  if (!canSupportNode(node)) {
    showError(t('agora', 'You do not have permission to support this option'))
    return
  }

  try {
    await supportsStore.toggleSupport(
      node.id, 
      sessionStore.currentUser.id, 
      node, 
      optionsStore
    )
    
    // Update the node in options store
    const index = optionsStore.options.findIndex(opt => opt.id === node.id)
    if (index >= 0) {
      // Refresh the support count
      optionsStore.options[index].status.countSupports = 
        await supportsStore.getSupportCount(node.id)
    }
    
    showSuccess(t('agora', 'Support updated'))
  } catch (err) {
    console.error('Failed to toggle support:', err)
    showError(t('agora', 'Failed to update support'))
  }
}

const openNodeDetail = (node: Option): void => {
  if (editingNodeId.value) return // Don't open detail modal while editing
  selectedNode.value = node
  showDetailModal.value = true
}

const closeDetailModal = (): void => {
  showDetailModal.value = false
  selectedNode.value = null
}

const openAddOptionModal = (optionTypeKey: string, parentId?: number): void => {
  selectedOptionTypeKey.value = optionTypeKey
  selectedParentId.value = parentId || null
  showAddOptionModal.value = true
}

const openAddOptionModalForNode = (node: Option): void => {
  if (editingNodeId.value) return // Don't open modal while editing
  const allowedResponses = getAllowedResponseTypes(node.type)
  if (allowedResponses.length > 0) {
    openAddOptionModal(allowedResponses[0], node.id)
  }
}

const openAddOptionModalForRoot = (): void => {
  const rootType = getRootType()
  openAddOptionModal(rootType)
}

const closeAddOptionModal = (): void => {
  showAddOptionModal.value = false
  selectedOptionTypeKey.value = null
  selectedParentId.value = null
}

const handleNodeUpdated = (updatedNode: Option): void => {
  const index = optionsStore.options.findIndex(opt => opt.id === updatedNode.id)
  if (index >= 0) {
    optionsStore.options[index] = updatedNode
  }

  closeDetailModal()
}

const handleNodeDeleted = (deletedNodeId: number): void => {
  const index = optionsStore.options.findIndex(opt => opt.id === deletedNodeId)
  if (index >= 0) {
    optionsStore.options.splice(index, 1)
  }

  if (activeNodeId.value === deletedNodeId) {
    activeNodeId.value = null
  }

  closeDetailModal()
}

const handleOptionCreated = (newOption: Option): void => {
  optionsStore.options.push(newOption)
  closeAddOptionModal()

  if ((!newOption.parentId || newOption.parentId === 0) && !activeNodeId.value) {
    setActiveNode(newOption)
  } else if (newOption.parentId === activeNodeId.value) {
    if (activeNode.value) {
      setActiveNode(activeNode.value)
    }
  }
}

// Initialize
onMounted(() => {
  if (inquiryStore.id) {
    optionsStore.load(inquiryStore.id).then(() => {
      if (structureRootOptions.value.length > 0 && !activeNodeId.value) {
        setActiveNode(structureRootOptions.value[0])
      }
    })
  }
})
</script>

<style scoped lang="scss">
.book-view {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
    background: var(--color-main-background);
    border-radius: 12px;
    overflow: hidden;
    font-family: var(--font-face);
}

.book-container {
    display: flex;
    flex: 1;
    overflow: hidden;
}

/* Table of Contents - Simplified */
.table-of-contents {
    width: 280px;
    background: var(--color-background-dark);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .toc-header {
        padding: 20px 24px;
        border-bottom: 1px solid var(--color-border);
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--color-main-text);
        }
    }

    .toc-list {
        flex: 1;
        overflow-y: auto;
        padding: 16px;

        .toc-item {
            margin-bottom: 4px;

            &.active {
                .toc-item-content {
                    background: var(--color-primary-light);
                    border-color: var(--color-primary-element);

                    .toc-title {
                        color: var(--color-primary-element);
                        font-weight: 600;
                    }
                }
            }

            .toc-item-content {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 12px;
                background: var(--color-main-background);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;

                &:hover {
                    background: var(--color-background-hover);
                    border-color: var(--color-primary-element);
                }

                .toc-icon {
                    flex-shrink: 0;
                    color: var(--color-primary-element);
                }

                .toc-text {
                    flex: 1;
                    min-width: 0;

                    .toc-title-display {
                        .toc-title {
                            font-size: 14px;
                            color: var(--color-main-text);
                            line-height: 1.3;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .toc-subtitle {
                            font-size: 11px;
                            color: var(--color-text-lighter);
                            margin-top: 2px;
                            font-weight: 500;
                        }
                    }
                }
            }

            .toc-children {
                margin-top: 4px;
                margin-left: 24px;

                .toc-item.child {
                    .toc-item-content {
                        padding: 8px 10px;

                        .toc-icon {
                            color: var(--color-warning);
                        }
                    }
                }
            }
        }

        .toc-empty {
            padding: 40px 20px;
            text-align: center;
            color: var(--color-text-lighter);

            svg {
                margin-bottom: 16px;
                opacity: 0.5;
            }

            p {
                margin: 0 0 16px 0;
                font-style: italic;
            }
        }
    }
}

/* Structure Node Styling */
.structure-node {
    position: relative;

    &.editing {
        .node-content {
            width: 100%;
        }

        .inline-edit-full {
            width: 100%;

            .edit-section {
                margin-bottom: 16px;

                &:last-child {
                    margin-bottom: 0;
                }

                .edit-label {
                    display: block;
                    margin-bottom: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--color-text-light);
                }

                .edit-input {
                    width: 100%;

                    &.title-input {
                        font-size: 16px;
                        font-weight: 600;
                    }

                    &.text-input {
                        font-size: 14px;
                        line-height: 1.5;
                        min-height: 60px;
                    }
                }
            }

            .edit-actions-full {
                display: flex;
                gap: 8px;
                margin-top: 16px;
            }
        }
    }

    .display-mode {
        cursor: pointer;

        .node-title {
            margin: 0;
            font-weight: 600;
            color: var(--color-main-text);
            line-height: 1.4;
            cursor: pointer;
            transition: color 0.2s ease;

            &:hover {
                color: var(--color-primary-element);
            }
        }

        .node-preview {
            margin-top: 8px;

            .node-text-preview {
                margin: 0;
                font-size: 13px;
                line-height: 1.5;
                color: var(--color-text-light);
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                cursor: pointer;

                &:hover {
                    color: var(--color-text-lighter);
                }
            }
        }
    }

    .node-meta-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;

        .node-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            color: var(--color-text-lighter);
            flex-wrap: wrap;

            .node-type {
                background: var(--color-background-dark);
                padding: 3px 8px;
                border-radius: 4px;
                font-weight: 500;
                color: var(--color-text-light);
            }

            .node-date {
                font-size: 12px;
                opacity: 0.8;
            }

            /* Support and comments inline - FIXED ALIGNMENT */
            .node-interactions {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-left: auto; /* Push to the right */

                .node-support-inline {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    cursor: pointer;

                    :deep(.support-feature) {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                }

                .node-comments-inline {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    cursor: pointer;
                    padding: 2px 6px;
                    border-radius: 4px;
                    transition: background 0.2s ease;

                    &:hover {
                        background: var(--color-background-hover);
                    }

                    span {
                        font-size: 12px;
                        font-weight: 600;
                        color: var(--color-text-lighter);
                    }
                }
            }
        }

        .node-quick-actions {
            display: flex;
            gap: 4px;
            opacity: 0;
            transition: opacity 0.2s ease;
            flex-shrink: 0;

            .add-child-btn {
                opacity: 0;
                transition: opacity 0.2s ease;
            }
        }
    }

    &:hover {
        .node-meta-actions {
            .node-quick-actions {
                opacity: 1;

                .add-child-btn {
                    opacity: 1;
                }
            }
        }

        .allowed-responses-hover {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
    }

    /* Allowed responses hover panel - FIXED ALIGNMENT */
    .allowed-responses-hover {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-main-background);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 12px;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 10;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        pointer-events: none;

        .responses-options {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;

            .response-type-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                min-height: 32px;
                font-size: 12px;
                padding: 6px 10px;
                white-space: nowrap;

                /* Remove any icon-specific margins */
                :deep(.button-vue__icon) {
                    margin-right: 0;
                }
            }
        }
    }
}

/* Compact Support Feature */
.support-feature-compact {
    :deep(.support-feature) {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 6px;
        border-radius: 4px;

        .support-icon {
            margin-right: 2px;
        }

        .support-count {
            font-size: 11px;
            font-weight: 600;
        }
    }
}

/* Adjustments for different levels */
.structure-node.level-1 {
    .node-title {
        font-size: 16px;
    }
    
    .allowed-responses-hover {
        position: absolute;
    }
}

.structure-node.level-2 {
    .node-title {
        font-size: 15px;
    }
    
    .allowed-responses-hover {
        position: relative;
        top: auto;
        margin-top: 8px;
    }
}

.structure-node.level-3 {
    .node-title {
        font-size: 14px;
    }
    
    .allowed-responses-hover {
        position: relative;
        top: auto;
        margin-top: 8px;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .structure-node {
        .node-meta-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;

            .node-meta {
                width: 100%;
                justify-content: space-between;
                
                .node-interactions {
                    margin-left: 0;
                    width: 100%;
                    justify-content: flex-start;
                }
            }

            .node-quick-actions {
                opacity: 1;
                width: 100%;
                justify-content: flex-end;

                .add-child-btn {
                    opacity: 1;
                }
            }
        }

        .allowed-responses-hover {
            position: relative;
            opacity: 1;
            transform: none;
            pointer-events: auto;
            margin-top: 12px;
        }
    }
}

/* Book Content */
.book-content {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
    background: var(--color-main-background);

    .content-panel {
        max-width: 800px;
        margin: 0 auto;
    }

    .content-header {
        margin-bottom: 32px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--color-border);

        .content-title-area {
            .title-display {
                h2 {
                    margin: 0 0 8px 0;
                    font-size: 32px;
                    font-weight: 700;
                    color: var(--color-main-text);
                    line-height: 1.2;
                }

                h3 {
                    margin: 0 0 12px 0;
                    font-size: 20px;
                    font-weight: 400;
                    color: var(--color-text-light);
                    line-height: 1.5;
                }

                .title-meta {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    color: var(--color-text-lighter);

                    .type-label {
                        background: var(--color-background-hover);
                        padding: 4px 8px;
                        border-radius: 6px;
                        font-weight: 500;
                    }
                }
            }
        }
    }

    .content-body {
        .content-display {
            margin-bottom: 32px;

            .text-content {
                .text-text {
                    font-size: 16px;
                    line-height: 1.7;
                    color: var(--color-main-text);
                    white-space: pre-wrap;
                }

                .empty-content {
                    padding: 40px;
                    text-align: center;
                    color: var(--color-text-lighter);
                    font-style: italic;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    border: 2px dashed var(--color-border);
                    border-radius: 12px;

                    p {
                        margin: 0;
                    }
                }
            }
        }

        /* Support and Comments Footer */
        .support-comments-footer {
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 16px 0;
            border-top: 1px solid var(--color-border-light);

            .support-section {
                display: flex;
                align-items: center;
                gap: 8px;

                .support-icon {
                    cursor: pointer;
                    color: var(--color-text-light);
                    transition: all 0.2s ease;

                    &:hover {
                        color: var(--color-primary-element);
                        transform: scale(1.1);
                    }
                }

                .support-count {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 13px;
                    color: var(--color-text-lighter);

                    .count-number {
                        font-weight: 600;
                        color: var(--color-main-text);
                    }
                }
            }

            .comments-section {
                display: flex;
                align-items: center;
                gap: 8px;

                .comment-count {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    background: var(--color-background-hover);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        background: var(--color-background-dark);
                    }

                    span {
                        font-size: 13px;
                        font-weight: 600;
                        color: var(--color-text-lighter);
                    }
                }
            }
        }
    }
}

/* STRUCTURE LAYOUT - Beautiful Design */
.structure-layout {
    max-width: 900px;
    margin: 0 auto;

    .structure-tree {
        .structure-level {
            &:not(:last-child) {
                margin-bottom: 24px;
            }
        }

        .structure-node {
            background: var(--color-main-background);
            border: 1px solid var(--color-border);
            border-radius: 10px;
            transition: all 0.2s ease;
            margin-bottom: 12px;

            &.level-1 {
                border-left: 4px solid var(--color-primary-element);
            }

            &.level-2 {
                border-left: 4px solid var(--color-warning);
                margin-left: 32px;
                background: var(--color-background-hover);
            }

            &.level-3 {
                border-left: 4px solid var(--color-success);
                margin-left: 64px;
                background: var(--color-background-dark);
            }

            &.active {
                border-color: var(--color-primary-element);
                box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.1);
                transform: translateY(-1px);

                .node-header {
                    background: var(--color-primary-light);
                }
            }

            &:hover {
                border-color: var(--color-primary-element);

                .node-quick-actions {
                    opacity: 1;
                }
            }

            .node-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-radius: 9px 9px 0 0;
                transition: background 0.2s ease;

                .node-icon-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;

                    .node-icon {
                        flex-shrink: 0;
                        color: var(--color-primary-element);
                    }

                    .node-content {
                        flex: 1;

                        .node-title-row {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 6px;

                            .inline-edit {
                                flex: 1;
                                margin-right: 8px;

                                .edit-actions {
                                    display: flex;
                                    gap: 8px;
                                    margin-top: 8px;
                                }
                            }

                            .node-title {
                                margin: 0;
                                font-size: 16px;
                                font-weight: 600;
                                color: var(--color-main-text);
                                line-height: 1.4;
                                flex: 1;
                            }

                            .node-quick-actions {
                                display: flex;
                                gap: 4px;
                                opacity: 0;
                                transition: opacity 0.2s ease;
                            }
                        }

                        .node-meta {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            font-size: 13px;
                            color: var(--color-text-lighter);

                            .node-type {
                                background: var(--color-background-dark);
                                padding: 3px 8px;
                                border-radius: 4px;
                                font-weight: 500;
                                color: var(--color-text-light);
                            }

                            .node-date {
                                font-size: 12px;
                                opacity: 0.8;
                            }

                            .node-interactions {
                                display: flex;
                                align-items: center;
                                gap: 12px;
                                margin-left: auto;

                                .node-support-inline {
                                    display: flex;
                                    align-items: center;
                                    gap: 4px;
                                    cursor: pointer;

                                    .support-icon-inline {
                                        color: var(--color-text-light);
                                        transition: all 0.2s ease;

                                        &:hover {
                                            color: var(--color-primary-element);
                                            transform: scale(1.1);
                                        }
                                    }

                                    .support-count-inline {
                                        font-size: 12px;
                                        font-weight: 600;
                                        color: var(--color-text-lighter);
                                    }
                                }

                                .node-comments-inline {
                                    display: flex;
                                    align-items: center;
                                    gap: 4px;
                                    cursor: pointer;
                                    padding: 2px 6px;
                                    border-radius: 4px;
                                    transition: background 0.2s ease;

                                    &:hover {
                                        background: var(--color-background-hover);
                                    }

                                    span {
                                        font-size: 12px;
                                        font-weight: 600;
                                        color: var(--color-text-lighter);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .structure-children {
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 12px;

                .structure-node {
                    margin-top: 8px;
                    margin-bottom: 8px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .structure-empty {
            padding: 60px 20px;
            text-align: center;
            color: var(--color-text-lighter);
            background: var(--color-background-hover);
            border-radius: 12px;
            border: 2px dashed var(--color-border);

            svg {
                margin-bottom: 20px;
                opacity: 0.6;
                color: var(--color-primary-element);
            }

            p {
                margin: 0 0 20px 0;
                font-size: 16px;
                font-style: italic;
            }
        }
    }
}

/* Responsive Design */
@media (max-width: 1200px) {
    .table-of-contents {
        width: 250px;
    }
}

@media (max-width: 1024px) {
    .book-container {
        flex-direction: column;
    }

    .table-of-contents {
        width: 100%;
        max-height: 300px;
        border-right: none;
        border-bottom: 1px solid var(--color-border);
    }

    .book-content {
        padding: 24px;
    }

    .structure-node {
        &.level-2 {
            margin-left: 20px;
        }

        &.level-3 {
            margin-left: 40px;
        }
    }
}

@media (max-width: 768px) {
    .book-content {
        padding: 16px;
    }

    .structure-node {
        .node-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 12px;

            .node-icon-title {
                .node-content {
                    .node-title-row {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;

                        .node-quick-actions {
                            opacity: 1;
                        }
                    }

                    .node-meta {
                        flex-wrap: wrap;
                        gap: 8px;

                        .node-interactions {
                            margin-left: 0;
                            width: 100%;
                            justify-content: flex-start;
                        }
                    }
                }
            }
        }

        &.level-2,
        &.level-3 {
            margin-left: 12px;
        }
    }

    .support-comments-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
}
</style>
