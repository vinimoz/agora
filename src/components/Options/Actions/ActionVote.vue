<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <!-- For actions that need a modal -->
  <ExportResultsModal
    v-if="showExportResult"
    :show="show"
    :inquiry-id="inquiryId"
    @close="handleClose"
    @exported="handleExported"
  />
  
  <div v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'  // ← ADD 'ref' here!
import { showSuccess, showError } from '@nextcloud/dialogs'
import ExportResultsModal from './ExportResultsModal.vue'
import { useSupportEngineStore } from '../../../stores/supportEngine'

interface Props {
  show: boolean
  inquiryId: number
  actionKey?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  actionCompleted: [result: unknown]
}>()

const engineStore = useSupportEngineStore()
const showExportResult = ref(false)  // Now ref is defined!

// Execute action immediately when component mounts
const executeAction = async () => {
  switch (props.actionKey) {
    case 'start_vote':
      await startVote()
      break
    case 'close_vote':
      await closeVote()
      break
    case 'next_phase':
      await nextPhase()
      break
    case 'view_results':
      await viewResults()  
      break
    case 'export_results':
      showExportResult.value = true
      return  // Don't close yet, wait for modal
    default:
      console.warn(`Unknown action: ${props.actionKey}`)
  }
  
  // Close immediately after execution for non-modal actions
  if (props.actionKey !== 'export_results') {
    emit('close')
  }
}
const startVote = async () => {
  try {
    const engine = engineStore.getCurrentEngine()
    
    if (!engine) {
      showError('Please create a vote system before starting a vote')
      return 
    }

    if (engine.target_ids.length === 0) {
      showError('Please add options before starting a vote')
      return
    }

    await engineStore.updateEngine(engine.id, { status: 'active' })
    showSuccess('Vote started successfully')
    emit('actionCompleted', { 
      refreshOptions: true, 
      message: 'Vote started successfully'
    })
  } catch (error) {
    // Only unexpected errors (e.g. network failure) will reach this point
    console.error('Failed to start vote:', error)
    showError('Failed to start vote')
  }
}


const closeVote = async () => {
  try {
    const engine = engineStore.getCurrentEngine()
   
   
    if (!engine) {
      showError('Please create a vote system before starting a vote')
      return   
    }

    if (engine.target_ids.length === 0) {
      showError('Please add options before starting a vote')
      return
    }
   
       if (engine.status === 'draft') {
      showError('Could not close a vote not started')
      return
    }


    await engineStore.updateEngine(engine.id, { status: 'closed' })
    
    showSuccess('Vote closed successfully')
    
    emit('actionCompleted', { 
      refreshOptions: true, 
      message: 'Vote closed successfully'
    })
  } catch (error) {
    console.error('Failed to close vote:', error)
    showError('Failed to close vote')
  }
}

const nextPhase = async () => {
  try {
    const engine = engineStore.getCurrentEngine()

    if (!engine) {
      showError('Please create a vote system before starting a vote')
      return   
    }

    if (engine.target_ids.length === 0) {
      showError('Please add options before starting a vote')
      return
    }
   
    
    const phases = ['draft', 'active', 'closed']
    const currentIdx = phases.indexOf(engine.status)
    const nextPhaseName = phases[currentIdx + 1]
    
    if (!nextPhaseName) {
      showError('Already in final phase')
      return
    }
    
    await engineStore.updateEngine(engine.id, { status: nextPhaseName })
    
    showSuccess(`Phase changed to ${nextPhaseName}`)
    
    emit('actionCompleted', { 
      refreshOptions: true, 
      message: `Phase changed to ${nextPhaseName}`
    })
  } catch (error) {
    console.error('Failed to change phase:', error)
    showError('Failed to change phase')
  }
}

const viewResults = async () => {
  // Emit signal to switch to results view
  emit('actionCompleted', { 
    switchToResultsLayout: true,
    message: 'Switched to results view'
  })
  emit('close')
}

const handleExported = () => {
  emit('actionCompleted', { 
    refreshOptions: false, 
    message: 'Results exported successfully'
  })
  handleClose()
}

const handleClose = () => {
  emit('close')
}

// Execute immediately when component mounts
onMounted(() => {
  executeAction()
})
</script>
