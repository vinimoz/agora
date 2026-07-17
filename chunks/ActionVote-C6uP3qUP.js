const appName = "agora";
const appVersion = "1.7.5";
import { d as defineComponent, w as watch, q as onMounted, s as ref, v as NcLoadingIcon, p as _export_sfc, o as openBlock, i as createElementBlock, j as createCommentVNode, b as createBlock, F as Fragment, h as createBaseVNode, t as toDisplayString } from "./NcEmptyContent-CGAPqk4S-DlUuxFD2.js";
import { u as useSupportEngineStore, s as showError, a as showSuccess } from "./NcDashboardWidget-DKZ8Mgt0-C_FKuvfq.js";
import ExportResultsModal from "./ExportResultsModal-DeF2_SDe.js";
import "./NcRichText-Dkk6iX8F-B1jLjmLZ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ActionVote",
  props: {
    show: { type: Boolean, required: true },
    inquiryId: { type: Number, required: true },
    actionKey: { type: String, required: false },
    actionData: { type: null, required: false }
  },
  emits: ["close", "actionCompleted"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const engineStore = useSupportEngineStore();
    const showExportResult = ref(false);
    const loading = ref(false);
    const error = ref(null);
    const executeAction = async () => {
      if (!props.show || !props.actionKey) return;
      loading.value = true;
      error.value = null;
      try {
        switch (props.actionKey) {
          case "start_vote":
            await startVote();
            break;
          case "close_vote":
            await closeVote();
            break;
          case "next_phase":
            await nextPhase();
            break;
          case "view_results":
            await viewResults();
            break;
          case "export_results":
            showExportResult.value = true;
            return;
          // Don't close yet, wait for modal
          default:
            console.warn(`Unknown action: ${props.actionKey}`);
        }
        if (props.actionKey !== "export_results") {
          emit("close");
        }
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Action failed";
        console.error(`Failed to execute ${props.actionKey}:`, err);
      } finally {
        loading.value = false;
      }
    };
    const startVote = async () => {
      try {
        const engine = engineStore.getCurrentEngine();
        if (!engine) {
          showError("Please create a vote system before starting a vote");
          return;
        }
        if (engine.target_ids.length === 0) {
          showError("Please add options before starting a vote");
          return;
        }
        await engineStore.updateEngine(engine.id, { status: "active" });
        showSuccess("Vote started successfully");
        emit("actionCompleted", {
          refreshOptions: true,
          message: "Vote started successfully"
        });
      } catch (error2) {
        console.error("Failed to start vote:", error2);
        showError("Failed to start vote");
      }
    };
    const closeVote = async () => {
      try {
        const engine = engineStore.getCurrentEngine();
        if (!engine) {
          showError("Please create a vote system before starting a vote");
          return;
        }
        if (engine.target_ids.length === 0) {
          showError("Please add options before starting a vote");
          return;
        }
        if (engine.status === "draft") {
          showError("Could not close a vote not started");
          return;
        }
        await engineStore.updateEngine(engine.id, { status: "closed" });
        showSuccess("Vote closed successfully");
        emit("actionCompleted", {
          refreshOptions: true,
          message: "Vote closed successfully"
        });
      } catch (error2) {
        console.error("Failed to close vote:", error2);
        showError("Failed to close vote");
      }
    };
    const nextPhase = async () => {
      try {
        const engine = engineStore.getCurrentEngine();
        if (!engine) {
          showError("Please create a vote system before starting a vote");
          return;
        }
        if (engine.target_ids.length === 0) {
          showError("Please add options before starting a vote");
          return;
        }
        const phases = ["draft", "active", "closed"];
        const currentIdx = phases.indexOf(engine.status);
        const nextPhaseName = phases[currentIdx + 1];
        if (!nextPhaseName) {
          showError("Already in final phase");
          return;
        }
        await engineStore.updateEngine(engine.id, { status: nextPhaseName });
        showSuccess(`Phase changed to ${nextPhaseName}`);
        emit("actionCompleted", {
          refreshOptions: true,
          message: `Phase changed to ${nextPhaseName}`
        });
      } catch (error2) {
        console.error("Failed to change phase:", error2);
        showError("Failed to change phase");
      }
    };
    const viewResults = async () => {
      emit("actionCompleted", {
        switchToResultsLayout: true,
        message: "Switched to results view"
      });
      emit("close");
    };
    const handleExported = () => {
      emit("actionCompleted", {
        refreshOptions: false,
        message: "Results exported successfully"
      });
      handleClose();
    };
    const handleClose = () => {
      emit("close");
    };
    watch(() => props.show, (newValue) => {
      if (newValue) {
        executeAction();
      }
    });
    onMounted(() => {
      if (props.show) {
        executeAction();
      }
    });
    const __returned__ = { props, emit, engineStore, showExportResult, loading, error, executeAction, startVote, closeVote, nextPhase, viewResults, handleExported, handleClose, ExportResultsModal, get NcLoading() {
      return NcLoadingIcon;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  key: 0,
  class: "action-vote-container"
};
const _hoisted_2 = {
  key: 1,
  class: "error-message"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.show ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createCommentVNode(" For actions that need a modal "),
    $setup.showExportResult ? (openBlock(), createBlock($setup["ExportResultsModal"], {
      key: 0,
      show: $setup.showExportResult,
      "inquiry-id": $props.inquiryId,
      onClose: $setup.handleClose,
      onExported: $setup.handleExported
    }, null, 8, ["show", "inquiry-id"])) : (openBlock(), createElementBlock(
      Fragment,
      { key: 1 },
      [
        createCommentVNode(" For actions that execute immediately "),
        createBaseVNode("div", null, [
          createCommentVNode(" Show loading or confirmation "),
          $setup.loading ? (openBlock(), createBlock($setup["NcLoading"], { key: 0 })) : $setup.error ? (openBlock(), createElementBlock(
            "div",
            _hoisted_2,
            toDisplayString($setup.error),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true)
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ))
  ])) : createCommentVNode("v-if", true);
}
const ActionVote = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/components/Options/Actions/ActionVote.vue"]]);
export {
  ActionVote as default
};
//# sourceMappingURL=ActionVote-C6uP3qUP.js.map
