(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".import-document-modal[data-v-4a34f33a] .modal-content {\n  padding: 24px;\n  max-height: 80vh;\n  overflow-y: auto;\n}\n.import-header[data-v-4a34f33a] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.import-header .header-icon[data-v-4a34f33a] {\n  color: var(--color-primary-element);\n  margin-bottom: 16px;\n}\n.import-header h2[data-v-4a34f33a] {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.import-header p[data-v-4a34f33a] {\n  margin: 0;\n  color: var(--color-text-lighter);\n}\n.file-drop-zone[data-v-4a34f33a] {\n  border: 2px dashed var(--color-border);\n  border-radius: 12px;\n  padding: 32px;\n  text-align: center;\n  transition: all 0.3s ease;\n  background: var(--color-background-dark);\n  margin-bottom: 24px;\n}\n.file-drop-zone.drag-over[data-v-4a34f33a] {\n  border-color: var(--color-primary-element);\n  background: var(--color-background-darker);\n}\n.file-drop-zone[data-v-4a34f33a]:hover {\n  border-color: var(--color-primary-element);\n  background: var(--color-background-darker);\n}\n.file-drop-zone .drop-zone-content .drop-icon[data-v-4a34f33a] {\n  color: var(--color-text-lighter);\n  margin-bottom: 16px;\n}\n.file-drop-zone .drop-zone-content .drop-text[data-v-4a34f33a] {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0 0 8px 0;\n}\n.file-drop-zone .drop-zone-content .drop-subtext[data-v-4a34f33a] {\n  margin: 0 0 16px 0;\n  color: var(--color-text-lighter);\n}\n.file-drop-zone .drop-zone-content .warning-note[data-v-4a34f33a] {\n  margin-top: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--color-warning);\n}\n.file-drop-zone .drop-zone-content .warning-note svg[data-v-4a34f33a] {\n  opacity: 0.7;\n}\n.file-drop-zone .selected-file-info[data-v-4a34f33a] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.file-drop-zone .selected-file-info .file-icon[data-v-4a34f33a] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-background-darker);\n  border-radius: 8px;\n}\n.file-drop-zone .selected-file-info .file-details[data-v-4a34f33a] {\n  flex: 1;\n  text-align: left;\n}\n.file-drop-zone .selected-file-info .file-details .file-name[data-v-4a34f33a] {\n  font-weight: 500;\n  margin-bottom: 4px;\n  word-break: break-word;\n}\n.file-drop-zone .selected-file-info .file-details .file-meta[data-v-4a34f33a] {\n  font-size: 12px;\n  color: var(--color-text-lighter);\n}\n.file-drop-zone .selected-file-info .file-details .file-meta .separator[data-v-4a34f33a] {\n  margin: 0 8px;\n}\n.supported-formats[data-v-4a34f33a] {\n  margin-top: 16px;\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.supported-formats .format-badge[data-v-4a34f33a] {\n  padding: 4px 8px;\n  background: var(--color-background-darker);\n  border-radius: 4px;\n  font-size: 11px;\n  font-family: monospace;\n  color: var(--color-text-lighter);\n}\n.checkbox-group[data-v-4a34f33a] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.checkbox-group[data-v-4a34f33a] .checkbox-radio-switch {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.form-group[data-v-4a34f33a] {\n  margin-bottom: 20px;\n}\n.form-group label[data-v-4a34f33a] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n  color: var(--color-main-text);\n}\n.import-options[data-v-4a34f33a] {\n  background: var(--color-background-dark);\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n}\n.import-options h3[data-v-4a34f33a] {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n.preview-section[data-v-4a34f33a] {\n  margin-bottom: 24px;\n}\n.preview-section .preview-header[data-v-4a34f33a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.preview-section .preview-header h3[data-v-4a34f33a] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n.preview-section .preview-content[data-v-4a34f33a] {\n  max-height: 400px;\n  overflow-y: auto;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n  padding: 16px;\n}\n.preview-section .preview-content .markdown-preview[data-v-4a34f33a] {\n  margin-bottom: 20px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid var(--color-border);\n}\n.preview-section .preview-content .markdown-preview[data-v-4a34f33a] h1 {\n  font-size: 24px;\n  margin-top: 0;\n}\n.preview-section .preview-content .markdown-preview[data-v-4a34f33a] h2 {\n  font-size: 20px;\n}\n.preview-section .preview-content .markdown-preview[data-v-4a34f33a] h3 {\n  font-size: 18px;\n}\n.preview-section .preview-content .markdown-preview[data-v-4a34f33a] p {\n  line-height: 1.6;\n}\n.preview-section .preview-content .metadata-preview ul[data-v-4a34f33a] {\n  margin: 8px 0 0 0;\n  padding-left: 20px;\n}\n.preview-section .preview-content .metadata-preview ul li[data-v-4a34f33a] {\n  margin: 4px 0;\n}\n.preview-section .preview-content .metadata-preview .sections-list[data-v-4a34f33a] {\n  margin-top: 16px;\n}\n.preview-section .preview-content .metadata-preview .sections-list ul li[data-v-4a34f33a] {\n  font-size: 13px;\n}\n.modal-actions[data-v-4a34f33a] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}\n@media (max-width: 768px) {\n.file-drop-zone[data-v-4a34f33a] {\n    padding: 20px;\n}\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const appName = "agora";
const appVersion = "1.7.5";
import { x as translate, d as defineComponent, c as computed, w as watch, s as ref, C as NcButton, D as NcModal, G as purify, p as _export_sfc, o as openBlock, b as createBlock, e as withCtx, h as createBaseVNode, f as resolveDynamicComponent, t as toDisplayString, j as createCommentVNode, J as withModifiers, K as normalizeClass, i as createElementBlock, g as createVNode, F as Fragment, L as renderList, E as createTextVNode } from "./NcEmptyContent-CGAPqk4S-DlUuxFD2.js";
import { f as showInfo, a as showSuccess, s as showError, h as useOptionsStore, i as ImportIcons } from "./NcDashboardWidget-DKZ8Mgt0-C_FKuvfq.js";
import { N as NcCheckboxRadioSwitch, a as NcSelect, b as NcInputField } from "./NcRichText-Dkk6iX8F-B1jLjmLZ.js";
import { a as NcFilePicker } from "./index-Bfp6FUTl.js";
class ImportService {
  constructor() {
    this.maxFileSize = 10 * 1024 * 1024;
  }
  // 10MB default
  async importDocument(options) {
    try {
      if (options.sourceType === "file" && options.file) {
        return await this.importFromFile(options.file);
      }
      throw new Error("Invalid source type or no file provided");
    } catch (error) {
      console.error("Import error:", error);
      return {
        success: false,
        content: "",
        error: error instanceof Error ? error.message : "Unknown import error"
      };
    }
  }
  async importFromFile(file) {
    if (file.size > this.maxFileSize) {
      throw new Error(`File size exceeds ${this.maxFileSize / 1024 / 1024}MB limit`);
    }
    showInfo(translate("agora", "Processing file: {filename} …", {
      filename: file.name
    }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/apps/agora/import", {
        method: "POST",
        headers: {
          "requesttoken": window.OC?.requestToken || ""
        },
        body: formData
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }
      showSuccess(translate("agora", "File imported successfully: {filename}", {
        filename: file.name
      }));
      return {
        success: true,
        content: result.content,
        title: result.title,
        metadata: result.metadata
      };
    } catch (error) {
      showError(translate("agora", "Failed to import file: {error}", {
        error: error instanceof Error ? error.message : "Unknown error"
      }));
      throw error;
    }
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImportDocumentModal",
  props: {
    show: { type: Boolean, required: true },
    familyKey: { type: String, required: true }
  },
  emits: ["close", "imported"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const importService = new ImportService();
    const optionsStore = useOptionsStore();
    const selectedFile = ref(null);
    const isDragOver = ref(false);
    const convertToMarkdown = ref(true);
    const extractStructure = ref(true);
    const title = ref("");
    const importType = ref(null);
    const parentOption = ref(null);
    const importing = ref(false);
    const previewContent = ref("");
    const showFullPreview = ref(false);
    const documentMetadata = ref(null);
    const sanitizedPreviewContent = computed(() => purify.sanitize(previewContent.value));
    const supportedFormats = ["doc", "docx", "odt", "html", "md", "pdf", "txt"];
    const acceptedFormats = supportedFormats;
    const modalTitle = computed(() => translate("agora", "Import Document"));
    const canImport = computed(() => selectedFile.value !== null);
    const importTypes = computed(() => {
      const family = optionsStore.families.find((f) => f.key === props.familyKey);
      if (!family) return [];
      return family.types.map((type) => ({
        value: type.option_type,
        label: type.label || type.option_type
      }));
    });
    const parentOptions = computed(
      () => optionsStore.options.filter((opt) => opt.typeInfo?.features?.includes("hierarchical")).map((opt) => ({
        value: opt.id,
        label: opt.title || `Option #${opt.id}`
      }))
    );
    const handleFilePick = (files) => {
      if (files && files.length > 0) {
        const file = files[0];
        validateAndSetFile(file);
      }
    };
    const validateAndSetFile = (file) => {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico", "heic", "heif"];
      if (file.type.startsWith("image/") || imageExtensions.includes(fileExt)) {
        showError(translate("agora", "Image files are not supported. Please upload document files (DOC, DOCX, PDF, ODT, HTML, TXT, MD)"));
        return false;
      }
      const supportedExtensions = ["doc", "docx", "odt", "html", "htm", "pdf", "md", "markdown", "txt"];
      if (!supportedExtensions.includes(fileExt)) {
        showError(translate("agora", "Unsupported file type. Please upload: {formats}", {
          formats: supportedExtensions.join(", ")
        }));
        return false;
      }
      selectedFile.value = file;
      if (!title.value) {
        title.value = selectedFile.value.name.replace(/\.[^/.]+$/, "");
      }
      return true;
    };
    const clearSelectedFile = () => {
      selectedFile.value = null;
      isDragOver.value = false;
      previewContent.value = "";
      documentMetadata.value = null;
    };
    const handleDragOver = (event) => {
      event.preventDefault();
      isDragOver.value = true;
    };
    const handleDragLeave = (event) => {
      event.preventDefault();
      isDragOver.value = false;
    };
    const handleFileDrop = (event) => {
      event.preventDefault();
      isDragOver.value = false;
      const files = event.dataTransfer?.files;
      if (files && files[0]) {
        validateAndSetFile(files[0]);
      }
    };
    const getFileIcon = (filename) => {
      const ext = filename.split(".").pop()?.toLowerCase();
      switch (ext) {
        case "doc":
        case "docx":
          return ImportIcons.FileWord;
        case "odt":
          return ImportIcons.FileText;
        case "html":
        case "htm":
          return ImportIcons.FileCode;
        case "md":
          return ImportIcons.Markdown;
        default:
          return ImportIcons.File;
      }
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };
    const generatePreview = async () => {
      if (selectedFile.value) {
        try {
          const result = await importService.importDocument({
            sourceType: "file",
            file: selectedFile.value
          });
          if (result.success) {
            previewContent.value = SafeMarkdownParser.parse(result.content);
            documentMetadata.value = result.metadata;
            if (!title.value && result.title) {
              title.value = result.title;
            }
          }
        } catch (error) {
          console.error("Preview error:", error);
        }
      }
    };
    const handleImport = async () => {
      importing.value = true;
      try {
        if (!selectedFile.value) throw new Error("No file selected");
        const importResult = await importService.importDocument({
          sourceType: "file",
          file: selectedFile.value,
          options: {
            convertToMarkdown: convertToMarkdown.value,
            detectChapters: extractStructure.value
          }
        });
        if (!importResult.success) {
          throw new Error(importResult.error);
        }
        await optionsStore.add({
          title: title.value || importResult.title || "Imported Document",
          text: importResult.content,
          type: importType.value || "document",
          parentId: parentOption.value || void 0,
          miscFields: {
            metadata: {
              key: "metadata",
              value: JSON.stringify(importResult.metadata || {})
            },
            source_filename: { key: "source_filename", value: selectedFile.value.name }
          }
        });
        showSuccess(translate("agora", "Document imported successfully"));
        emit("imported", importResult);
        handleClose();
      } catch (error) {
        console.error("Import error:", error);
        showError(translate("agora", "Failed to import document: {error}", {
          error: error instanceof Error ? error.message : "Unknown error"
        }));
      } finally {
        importing.value = false;
      }
    };
    const handleClose = () => {
      emit("close");
    };
    watch([selectedFile, convertToMarkdown, extractStructure], () => {
      if (selectedFile.value) {
        generatePreview();
      }
    }, { immediate: false });
    const __returned__ = { props, emit, importService, optionsStore, selectedFile, isDragOver, convertToMarkdown, extractStructure, title, importType, parentOption, importing, previewContent, showFullPreview, documentMetadata, sanitizedPreviewContent, supportedFormats, acceptedFormats, modalTitle, canImport, importTypes, parentOptions, handleFilePick, validateAndSetFile, clearSelectedFile, handleDragOver, handleDragLeave, handleFileDrop, getFileIcon, formatFileSize, generatePreview, handleImport, handleClose, get t() {
      return translate;
    }, get NcModal() {
      return NcModal;
    }, get NcButton() {
      return NcButton;
    }, get NcInputField() {
      return NcInputField;
    }, get NcSelect() {
      return NcSelect;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcFilePicker() {
      return NcFilePicker;
    }, get ImportIcons() {
      return ImportIcons;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "modal-content" };
const _hoisted_2 = { class: "import-header" };
const _hoisted_3 = {
  key: 0,
  class: "drop-zone-content"
};
const _hoisted_4 = { class: "drop-text" };
const _hoisted_5 = { class: "drop-subtext" };
const _hoisted_6 = { class: "supported-formats" };
const _hoisted_7 = { class: "warning-note" };
const _hoisted_8 = {
  key: 1,
  class: "selected-file-info"
};
const _hoisted_9 = { class: "file-icon" };
const _hoisted_10 = { class: "file-details" };
const _hoisted_11 = { class: "file-name" };
const _hoisted_12 = { class: "file-meta" };
const _hoisted_13 = { class: "form-group" };
const _hoisted_14 = { class: "checkbox-group" };
const _hoisted_15 = { class: "import-options" };
const _hoisted_16 = { class: "form-group" };
const _hoisted_17 = { for: "document-title" };
const _hoisted_18 = { class: "form-group" };
const _hoisted_19 = { class: "form-group" };
const _hoisted_20 = {
  key: 0,
  class: "preview-section"
};
const _hoisted_21 = { class: "preview-header" };
const _hoisted_22 = {
  key: 0,
  class: "preview-content"
};
const _hoisted_23 = ["innerHTML"];
const _hoisted_24 = {
  key: 0,
  class: "metadata-preview"
};
const _hoisted_25 = { key: 0 };
const _hoisted_26 = { key: 1 };
const _hoisted_27 = { key: 2 };
const _hoisted_28 = { class: "structure-list" };
const _hoisted_29 = { key: 0 };
const _hoisted_30 = { key: 1 };
const _hoisted_31 = { key: 2 };
const _hoisted_32 = { key: 3 };
const _hoisted_33 = {
  key: 0,
  class: "sections-list"
};
const _hoisted_34 = { class: "modal-actions" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["NcModal"], {
    show: $props.show,
    name: $setup.modalTitle,
    size: "large",
    class: "import-document-modal",
    onClose: $setup.handleClose
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createBlock(resolveDynamicComponent($setup.ImportIcons.FileUpload), {
            size: 48,
            class: "header-icon"
          })),
          createBaseVNode(
            "h2",
            null,
            toDisplayString($setup.t("agora", "Import Document")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "p",
            null,
            toDisplayString($setup.t("agora", "Import documents, law proposals, or structured content from files")),
            1
            /* TEXT */
          )
        ]),
        createCommentVNode(" Drag & Drop Zone "),
        createBaseVNode(
          "div",
          {
            class: normalizeClass(["file-drop-zone", { "drag-over": $setup.isDragOver }]),
            onDragover: withModifiers($setup.handleDragOver, ["prevent"]),
            onDragleave: withModifiers($setup.handleDragLeave, ["prevent"]),
            onDrop: withModifiers($setup.handleFileDrop, ["prevent"])
          },
          [
            !$setup.selectedFile ? (openBlock(), createElementBlock("div", _hoisted_3, [
              (openBlock(), createBlock(resolveDynamicComponent($setup.ImportIcons.FileUpload), {
                size: 48,
                class: "drop-icon"
              })),
              createBaseVNode(
                "p",
                _hoisted_4,
                toDisplayString($setup.t("agora", "Drag and drop your file here")),
                1
                /* TEXT */
              ),
              createBaseVNode(
                "p",
                _hoisted_5,
                toDisplayString($setup.t("agora", "or")),
                1
                /* TEXT */
              ),
              createVNode($setup["NcFilePicker"], {
                ref: "picker",
                accept: $setup.acceptedFormats,
                multiple: false,
                onPick: $setup.handleFilePick
              }, null, 8, ["accept"]),
              createBaseVNode("div", _hoisted_6, [
                (openBlock(), createElementBlock(
                  Fragment,
                  null,
                  renderList($setup.supportedFormats, (format) => {
                    return createBaseVNode(
                      "span",
                      {
                        key: format,
                        class: "format-badge"
                      },
                      toDisplayString(format.toUpperCase()),
                      1
                      /* TEXT */
                    );
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ]),
              createBaseVNode("div", _hoisted_7, [
                (openBlock(), createBlock(resolveDynamicComponent($setup.ImportIcons.Alert), { size: 16 })),
                createBaseVNode(
                  "span",
                  null,
                  toDisplayString($setup.t("agora", "Image files are not supported")),
                  1
                  /* TEXT */
                )
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                (openBlock(), createBlock(resolveDynamicComponent($setup.getFileIcon($setup.selectedFile.name)), { size: 32 }))
              ]),
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode(
                  "div",
                  _hoisted_11,
                  toDisplayString($setup.selectedFile.name),
                  1
                  /* TEXT */
                ),
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode(
                    "span",
                    null,
                    toDisplayString($setup.formatFileSize($setup.selectedFile.size)),
                    1
                    /* TEXT */
                  ),
                  _cache[6] || (_cache[6] = createBaseVNode(
                    "span",
                    { class: "separator" },
                    "•",
                    -1
                    /* CACHED */
                  )),
                  createBaseVNode(
                    "span",
                    null,
                    toDisplayString($setup.selectedFile.type || "Unknown type"),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              createVNode($setup["NcButton"], {
                type: "tertiary",
                onClick: $setup.clearSelectedFile
              }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent($setup.ImportIcons.Close), { size: 20 }))
                ]),
                _: 1
                /* STABLE */
              })
            ]))
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ),
        createCommentVNode(" Conversion Options "),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode(
            "label",
            null,
            toDisplayString($setup.t("agora", "Conversion Options")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_14, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.convertToMarkdown,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.convertToMarkdown = $event),
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Convert to Markdown")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.extractStructure,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.extractStructure = $event),
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Extract document structure (chapters/sections)")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"])
          ])
        ]),
        createCommentVNode(" Import Options "),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Import Options")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode(
              "label",
              _hoisted_17,
              toDisplayString($setup.t("agora", "Document Title")),
              1
              /* TEXT */
            ),
            createVNode($setup["NcInputField"], {
              id: "document-title",
              modelValue: $setup.title,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.title = $event),
              label: $setup.t("agora", "Document Title"),
              "label-outside": true,
              placeholder: $setup.t("agora", "Enter document title")
            }, null, 8, ["modelValue", "label", "placeholder"])
          ]),
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode(
              "label",
              null,
              toDisplayString($setup.t("agora", "Import as")),
              1
              /* TEXT */
            ),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.importType,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.importType = $event),
              options: $setup.importTypes,
              placeholder: $setup.t("agora", "Select option type"),
              "input-label": $setup.t("agora", "Import as")
            }, null, 8, ["modelValue", "options", "placeholder", "input-label"])
          ]),
          createBaseVNode("div", _hoisted_19, [
            createBaseVNode(
              "label",
              null,
              toDisplayString($setup.t("agora", "Target Section")),
              1
              /* TEXT */
            ),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.parentOption,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.parentOption = $event),
              options: $setup.parentOptions,
              placeholder: $setup.t("agora", "Select parent section (optional)"),
              "input-label": $setup.t("agora", "Target Section")
            }, null, 8, ["modelValue", "options", "placeholder", "input-label"])
          ])
        ]),
        createCommentVNode(" Preview Section "),
        $setup.previewContent ? (openBlock(), createElementBlock("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            createBaseVNode(
              "h3",
              null,
              toDisplayString($setup.t("agora", "Preview")),
              1
              /* TEXT */
            ),
            createVNode($setup["NcButton"], {
              type: "tertiary",
              onClick: _cache[5] || (_cache[5] = ($event) => $setup.showFullPreview = !$setup.showFullPreview)
            }, {
              icon: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent($setup.showFullPreview ? $setup.ImportIcons.EyeOff : $setup.ImportIcons.Eye), { size: 20 }))
              ]),
              default: withCtx(() => [
                createTextVNode(
                  " " + toDisplayString($setup.showFullPreview ? $setup.t("agora", "Hide preview") : $setup.t("agora", "Show preview")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          $setup.showFullPreview ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createCommentVNode(" eslint-enable vue/no-v-html "),
            createBaseVNode("div", {
              class: "markdown-preview",
              innerHTML: $setup.sanitizedPreviewContent
            }, null, 8, _hoisted_23),
            createCommentVNode(" eslint-disable-line vue/no-v-html "),
            $setup.documentMetadata ? (openBlock(), createElementBlock("div", _hoisted_24, [
              createBaseVNode(
                "h4",
                null,
                toDisplayString($setup.t("agora", "Document Metadata")),
                1
                /* TEXT */
              ),
              createBaseVNode("ul", null, [
                $setup.documentMetadata.wordCount ? (openBlock(), createElementBlock("li", _hoisted_25, [
                  createBaseVNode(
                    "strong",
                    null,
                    toDisplayString($setup.t("agora", "Word Count")) + ":",
                    1
                    /* TEXT */
                  ),
                  createTextVNode(
                    " " + toDisplayString($setup.documentMetadata.wordCount),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true),
                $setup.documentMetadata.chapterCount ? (openBlock(), createElementBlock("li", _hoisted_26, [
                  createBaseVNode(
                    "strong",
                    null,
                    toDisplayString($setup.t("agora", "Chapters/Sections")) + ":",
                    1
                    /* TEXT */
                  ),
                  createTextVNode(
                    " " + toDisplayString($setup.documentMetadata.chapterCount),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true),
                $setup.documentMetadata.detectedStructure ? (openBlock(), createElementBlock("li", _hoisted_27, [
                  createBaseVNode(
                    "strong",
                    null,
                    toDisplayString($setup.t("agora", "Detected Structure")) + ":",
                    1
                    /* TEXT */
                  ),
                  createBaseVNode("ul", _hoisted_28, [
                    $setup.documentMetadata.detectedStructure.hasIntroduction ? (openBlock(), createElementBlock(
                      "li",
                      _hoisted_29,
                      " ✓ " + toDisplayString($setup.t("agora", "Introduction")),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    $setup.documentMetadata.detectedStructure.hasChapters ? (openBlock(), createElementBlock(
                      "li",
                      _hoisted_30,
                      " ✓ " + toDisplayString($setup.t("agora", "Chapters")),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    $setup.documentMetadata.detectedStructure.hasArticles ? (openBlock(), createElementBlock(
                      "li",
                      _hoisted_31,
                      " ✓ " + toDisplayString($setup.t("agora", "Articles")),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    $setup.documentMetadata.detectedStructure.hasConclusion ? (openBlock(), createElementBlock(
                      "li",
                      _hoisted_32,
                      " ✓ " + toDisplayString($setup.t("agora", "Conclusion")),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ])
                ])) : createCommentVNode("v-if", true)
              ]),
              $setup.documentMetadata.sections && $setup.documentMetadata.sections.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_33, [
                createBaseVNode(
                  "h4",
                  null,
                  toDisplayString($setup.t("agora", "Detected Sections")),
                  1
                  /* TEXT */
                ),
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList($setup.documentMetadata.sections.slice(0, 10), (section, idx) => {
                      return openBlock(), createElementBlock("li", { key: idx }, [
                        createBaseVNode(
                          "strong",
                          null,
                          toDisplayString(section.type) + ":",
                          1
                          /* TEXT */
                        ),
                        createTextVNode(
                          " " + toDisplayString(section.title),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true)
        ])) : createCommentVNode("v-if", true),
        createCommentVNode(" Actions "),
        createBaseVNode("div", _hoisted_34, [
          createVNode($setup["NcButton"], {
            type: "tertiary",
            onClick: $setup.handleClose
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Cancel")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode($setup["NcButton"], {
            type: "primary",
            disabled: !$setup.canImport,
            loading: $setup.importing,
            onClick: $setup.handleImport
          }, {
            icon: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent($setup.ImportIcons.Import), { size: 20 }))
            ]),
            default: withCtx(() => [
              createTextVNode(
                " " + toDisplayString($setup.t("agora", "Import Document")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "loading"])
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["show", "name"]);
}
const ImportDocumentModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4a34f33a"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Options/Actions/ImportDocumentModal.vue"]]);
export {
  ImportDocumentModal as default
};
//# sourceMappingURL=ImportDocumentModal-B9UB3Cvi.js.map
