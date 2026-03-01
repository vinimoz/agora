(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode('@charset "UTF-8";\n.use-case-selection[data-v-cbe6b281] {\n  padding: 20px;\n}\n.use-case-header[data-v-cbe6b281] {\n  text-align: center;\n  margin-bottom: 40px;\n}\n.use-case-header h2[data-v-cbe6b281] {\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.use-case-header .subtitle[data-v-cbe6b281] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n}\n.use-case-grid[data-v-cbe6b281] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.use-case-card[data-v-cbe6b281] {\n  background: var(--color-main-background);\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-large);\n  padding: 24px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.use-case-card[data-v-cbe6b281]:hover {\n  border-color: var(--color-primary-element);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n}\n.use-case-card.selected[data-v-cbe6b281] {\n  border-color: var(--color-primary-element);\n  border-width: 3px;\n  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);\n}\n.card-icon[data-v-cbe6b281] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  text-align: center;\n}\n.card-title[data-v-cbe6b281] {\n  font-size: 18px;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.card-description[data-v-cbe6b281] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.card-examples[data-v-cbe6b281] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  font-size: 13px;\n  color: var(--color-text-maxcontrast);\n}\n.card-examples li[data-v-cbe6b281] {\n  padding: 4px 0;\n  padding-left: 20px;\n  position: relative;\n}\n.card-examples li[data-v-cbe6b281]::before {\n  content: "•";\n  position: absolute;\n  left: 8px;\n  color: var(--color-primary-element);\n}\n.selected-indicator[data-v-cbe6b281] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: var(--color-primary-element);\n  color: var(--color-primary-element-text);\n  padding: 4px 12px;\n  border-radius: var(--border-radius-pill);\n  font-size: 12px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.selected-indicator .check-icon[data-v-cbe6b281] {\n  font-size: 14px;\n}.template-selection[data-v-4e395d60] {\n  padding: 20px;\n}\n.template-header[data-v-4e395d60] {\n  text-align: center;\n  margin-bottom: 30px;\n}\n.template-header h2[data-v-4e395d60] {\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.template-header .subtitle[data-v-4e395d60] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n}\n.upload-section[data-v-4e395d60] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n  padding: 20px;\n  background: var(--color-background-hover);\n  border-radius: var(--border-radius-large);\n}\n.upload-section .upload-error[data-v-4e395d60],\n.upload-section .upload-success[data-v-4e395d60] {\n  width: 100%;\n  max-width: 600px;\n}\n.help-section[data-v-4e395d60] {\n  width: 100%;\n  max-width: 700px;\n  margin-top: 20px;\n}\n.help-content[data-v-4e395d60] {\n  margin-top: 16px;\n  padding: 20px;\n  background: var(--color-main-background);\n  border-radius: var(--border-radius-large);\n  border: 1px solid var(--color-border);\n}\n.help-actions[data-v-4e395d60] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  margin: 16px 0;\n}\n.help-instructions[data-v-4e395d60] {\n  text-align: left;\n  margin-top: 20px;\n}\n.help-instructions h4[data-v-4e395d60] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 16px 0 8px 0;\n  color: var(--color-main-text);\n}\n.help-instructions ol[data-v-4e395d60], .help-instructions ul[data-v-4e395d60] {\n  margin: 8px 0;\n  padding-left: 24px;\n}\n.help-instructions ol li[data-v-4e395d60], .help-instructions ul li[data-v-4e395d60] {\n  margin: 6px 0;\n  font-size: 13px;\n  color: var(--color-text-maxcontrast);\n}\n.help-instructions .ai-list[data-v-4e395d60] {\n  list-style: none;\n  padding-left: 0;\n}\n.help-instructions .ai-list li[data-v-4e395d60] {\n  margin: 10px 0;\n  padding-left: 12px;\n}\n.help-instructions .ai-list li strong[data-v-4e395d60] {\n  color: var(--color-main-text);\n}\n.divider[data-v-4e395d60] {\n  text-align: center;\n  margin: 30px 0;\n  position: relative;\n}\n.divider[data-v-4e395d60]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  height: 1px;\n  background: var(--color-border);\n  z-index: 0;\n}\n.divider span[data-v-4e395d60] {\n  background: var(--color-main-background);\n  padding: 0 16px;\n  color: var(--color-text-maxcontrast);\n  font-size: 13px;\n  position: relative;\n  z-index: 1;\n}\n.template-list[data-v-4e395d60] {\n  display: grid;\n  gap: 16px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.template-card[data-v-4e395d60] {\n  background: var(--color-main-background);\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-large);\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.template-card[data-v-4e395d60]:hover {\n  border-color: var(--color-primary-element);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.template-card.selected[data-v-4e395d60] {\n  border-color: var(--color-primary-element);\n  border-width: 3px;\n  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);\n}\n.template-card-header[data-v-4e395d60] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.template-name[data-v-4e395d60] {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0;\n}\n.template-version[data-v-4e395d60] {\n  font-size: 12px;\n  color: var(--color-text-maxcontrast);\n  background: var(--color-background-dark);\n  padding: 2px 8px;\n  border-radius: var(--border-radius-pill);\n}\n.template-description[data-v-4e395d60] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.template-meta[data-v-4e395d60] {\n  margin-bottom: 16px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid var(--color-border);\n}\n.meta-item[data-v-4e395d60] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 8px;\n  font-size: 13px;\n}\n.meta-label[data-v-4e395d60] {\n  font-weight: 600;\n  margin-right: 8px;\n  min-width: 80px;\n}\n.meta-value[data-v-4e395d60] {\n  color: var(--color-text-maxcontrast);\n}\n.template-stats[data-v-4e395d60] {\n  display: flex;\n  gap: 20px;\n  justify-content: space-around;\n}\n.stat-item[data-v-4e395d60] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.stat-value[data-v-4e395d60] {\n  font-size: 24px;\n  font-weight: 600;\n  color: var(--color-primary-element);\n}\n.stat-label[data-v-4e395d60] {\n  font-size: 12px;\n  color: var(--color-text-maxcontrast);\n  margin-top: 4px;\n}\n.selected-badge[data-v-4e395d60] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  background: var(--color-primary-element);\n  color: var(--color-primary-element-text);\n  padding: 4px 12px;\n  border-radius: var(--border-radius-pill);\n  font-size: 12px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.selected-badge .check-icon[data-v-4e395d60] {\n  font-size: 14px;\n}.language-selection[data-v-e6e1081e] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.language-header[data-v-e6e1081e] {\n  text-align: center;\n  margin-bottom: 30px;\n}\n.language-header h2[data-v-e6e1081e] {\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.language-header .subtitle[data-v-e6e1081e] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n}\n.language-note[data-v-e6e1081e] {\n  margin-bottom: 30px;\n}\n.language-grid[data-v-e6e1081e] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 16px;\n  margin-bottom: 30px;\n}\n.language-card[data-v-e6e1081e] {\n  background: var(--color-main-background);\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-large);\n  padding: 24px 16px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.language-card[data-v-e6e1081e]:hover {\n  border-color: var(--color-primary-element);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n}\n.language-card.selected[data-v-e6e1081e] {\n  border-color: var(--color-primary-element);\n  border-width: 3px;\n  background: var(--color-primary-element-light);\n  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);\n}\n.language-flag[data-v-e6e1081e] {\n  font-size: 32px;\n  font-weight: 700;\n  color: var(--color-primary-element);\n  margin-bottom: 8px;\n}\n.language-name[data-v-e6e1081e] {\n  font-size: 14px;\n  font-weight: 600;\n}\n.selected-check[data-v-e6e1081e] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 24px;\n  height: 24px;\n  background: var(--color-primary-element);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n}\n.selection-summary[data-v-e6e1081e] {\n  text-align: center;\n  padding: 16px;\n  background: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  font-size: 16px;\n}\n.selection-summary strong[data-v-e6e1081e] {\n  margin-right: 8px;\n}.preview-step[data-v-1aff519f] {\n  padding: 20px;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.preview-header[data-v-1aff519f] {\n  text-align: center;\n  margin-bottom: 30px;\n}\n.preview-header h2[data-v-1aff519f] {\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.preview-header .subtitle[data-v-1aff519f] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n}\n.loading-state[data-v-1aff519f] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-maxcontrast);\n}\n.analysis-loading[data-v-1aff519f] {\n  text-align: center;\n  padding: 20px;\n  background: var(--color-background-hover);\n  border-radius: var(--border-radius-large);\n  margin-bottom: 20px;\n}\n.analysis-loading p[data-v-1aff519f] {\n  margin-top: 12px;\n  color: var(--color-text-maxcontrast);\n}\n.analysis-error[data-v-1aff519f] {\n  margin-bottom: 20px;\n}\n.duplicate-notice[data-v-1aff519f] {\n  margin-bottom: 20px;\n}\n.summary-card[data-v-1aff519f] {\n  background: var(--color-primary-element-light);\n  border-radius: var(--border-radius-large);\n  padding: 20px;\n  margin-bottom: 24px;\n}\n.summary-card h3[data-v-1aff519f] {\n  font-size: 16px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  color: var(--color-primary-element);\n}\n.summary-stats[data-v-1aff519f] {\n  display: flex;\n  gap: 32px;\n  justify-content: center;\n}\n.stat-item[data-v-1aff519f] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n.stat-icon[data-v-1aff519f] {\n  font-size: 32px;\n}\n.stat-value[data-v-1aff519f] {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-primary-element);\n}\n.stat-value.stat-new[data-v-1aff519f] {\n  color: #1a7f37;\n}\n@media (prefers-color-scheme: dark) {\n.stat-value.stat-new[data-v-1aff519f] {\n    color: #3fb950;\n}\n}\n.stat-value.stat-existing[data-v-1aff519f] {\n  color: #9a6700;\n}\n@media (prefers-color-scheme: dark) {\n.stat-value.stat-existing[data-v-1aff519f] {\n    color: #e09b13;\n}\n}\n.stat-label[data-v-1aff519f] {\n  font-size: 12px;\n  color: var(--color-text-maxcontrast);\n  text-transform: uppercase;\n}\n.sections-container[data-v-1aff519f] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.section-block[data-v-1aff519f] {\n  background: var(--color-main-background);\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-large);\n  overflow: hidden;\n}\n.section-header[data-v-1aff519f] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  cursor: pointer;\n  background: var(--color-background-hover);\n  transition: background 0.2s ease;\n}\n.section-header[data-v-1aff519f]:hover {\n  background: var(--color-background-dark);\n}\n.section-title[data-v-1aff519f] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.section-title h3[data-v-1aff519f] {\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0;\n}\n.section-icon[data-v-1aff519f] {\n  font-size: 20px;\n}\n.section-count[data-v-1aff519f] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n}\n.section-status[data-v-1aff519f] {\n  display: flex;\n  gap: 8px;\n  margin-left: auto;\n}\n.status-badge[data-v-1aff519f] {\n  font-size: 11px;\n  padding: 3px 8px;\n  border-radius: var(--border-radius-pill);\n  font-weight: 600;\n}\n.status-badge.status-new[data-v-1aff519f] {\n  background-color: rgba(var(--color-success-rgb), 0.15);\n  color: var(--color-success-text);\n  border: 1px solid var(--color-success);\n}\n.status-badge.status-existing[data-v-1aff519f] {\n  background-color: rgba(var(--color-warning-rgb), 0.15);\n  color: var(--color-warning-text);\n  border: 1px solid var(--color-warning);\n}\n.expand-icon[data-v-1aff519f] {\n  color: var(--color-text-maxcontrast);\n  font-size: 12px;\n}\n.section-content[data-v-1aff519f] {\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.item-row[data-v-1aff519f] {\n  background: var(--color-background-hover);\n  border: 1px solid var(--color-border);\n  border-radius: var(--border-radius);\n  padding: 12px 16px;\n}\n.item-view[data-v-1aff519f] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n}\n.item-info[data-v-1aff519f] {\n  flex: 1;\n}\n.item-header-row[data-v-1aff519f] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 4px;\n}\n.item-label[data-v-1aff519f] {\n  font-size: 15px;\n  font-weight: 600;\n  flex: 1;\n}\n.item-status-badge[data-v-1aff519f] {\n  font-size: 11px;\n  padding: 3px 10px;\n  border-radius: var(--border-radius-pill);\n  font-weight: 600;\n}\n.item-status-badge.badge-new[data-v-1aff519f] {\n  background-color: rgba(var(--color-success-rgb), 0.15);\n  color: var(--color-success-text);\n  border: 1px solid var(--color-success);\n}\n.item-status-badge.badge-existing[data-v-1aff519f] {\n  background-color: rgba(var(--color-warning-rgb), 0.15);\n  color: var(--color-warning-text);\n  border: 1px solid var(--color-warning);\n}\n.item-type[data-v-1aff519f] {\n  font-size: 13px;\n  color: var(--color-text-maxcontrast);\n  font-family: monospace;\n  margin-bottom: 4px;\n}\n.item-description[data-v-1aff519f] {\n  font-size: 13px;\n  color: var(--color-text-maxcontrast);\n  margin-top: 8px;\n}\n.item-actions[data-v-1aff519f] {\n  display: flex;\n  gap: 8px;\n}\n.item-edit[data-v-1aff519f] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.edit-form[data-v-1aff519f] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.edit-field[data-v-1aff519f] {\n  width: 100%;\n}\n.edit-actions[data-v-1aff519f] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}.summary-step[data-v-13b1c365] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.summary-header[data-v-13b1c365] {\n  text-align: center;\n  margin-bottom: 30px;\n}\n.summary-header h2[data-v-13b1c365] {\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.summary-header .subtitle[data-v-13b1c365] {\n  color: var(--color-text-maxcontrast);\n  font-size: 14px;\n}\n.warning-note[data-v-13b1c365] {\n  margin-bottom: 30px;\n}\n.summary-box[data-v-13b1c365] {\n  background: var(--color-main-background);\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-large);\n  padding: 24px;\n}\n.summary-box h3[data-v-13b1c365] {\n  font-size: 18px;\n  font-weight: 600;\n  margin-bottom: 20px;\n  text-align: center;\n  color: var(--color-primary-element);\n}\n.summary-item[data-v-13b1c365] {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px 0;\n}\n.summary-item .label[data-v-13b1c365] {\n  font-weight: 600;\n  color: var(--color-text-maxcontrast);\n}\n.summary-item .value[data-v-13b1c365] {\n  font-weight: 500;\n}\n.summary-divider[data-v-13b1c365] {\n  height: 1px;\n  background: var(--color-border);\n  margin: 16px 0;\n}\n.summary-total[data-v-13b1c365] {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px;\n  background: var(--color-primary-element-light);\n  border-radius: var(--border-radius);\n  font-size: 18px;\n  font-weight: 600;\n}\n.summary-total .value[data-v-13b1c365] {\n  color: var(--color-primary-element);\n}.importing-step[data-v-38620be8] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 400px;\n  padding: 40px;\n}\n.importing-content[data-v-38620be8] {\n  text-align: center;\n  max-width: 500px;\n}\n.importing-content h2[data-v-38620be8] {\n  font-size: 24px;\n  font-weight: 600;\n  margin: 24px 0 16px;\n}\n.importing-content .importing-message[data-v-38620be8] {\n  font-size: 16px;\n  color: var(--color-text-maxcontrast);\n  margin-bottom: 8px;\n}\n.importing-content .importing-submessage[data-v-38620be8] {\n  font-size: 14px;\n  color: var(--color-text-maxcontrast);\n}.results-step[data-v-0e206bd8] {\n  padding: 20px;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.results-header[data-v-0e206bd8] {\n  text-align: center;\n  margin-bottom: 40px;\n}\n.results-header .success-icon[data-v-0e206bd8],\n.results-header .warning-icon[data-v-0e206bd8] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 48px;\n  margin: 0 auto 20px;\n}\n.results-header .success-icon[data-v-0e206bd8] {\n  background: #1a7f37;\n  color: white;\n}\n@media (prefers-color-scheme: dark) {\n.results-header .success-icon[data-v-0e206bd8] {\n    background: #3fb950;\n}\n}\n.results-header .warning-icon[data-v-0e206bd8] {\n  background: #9a6700;\n  color: white;\n}\n@media (prefers-color-scheme: dark) {\n.results-header .warning-icon[data-v-0e206bd8] {\n    background: #e09b13;\n}\n}\n.results-header h2[data-v-0e206bd8] {\n  font-size: 28px;\n  font-weight: 600;\n}\n.result-section[data-v-0e206bd8] {\n  background: var(--color-main-background);\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-large);\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.result-section h3[data-v-0e206bd8] {\n  font-size: 16px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.result-section.success-section[data-v-0e206bd8] {\n  border-color: #1a7f37;\n}\n@media (prefers-color-scheme: dark) {\n.result-section.success-section[data-v-0e206bd8] {\n    border-color: #3fb950;\n}\n}\n.result-section.success-section h3[data-v-0e206bd8] {\n  color: #1a7f37;\n}\n@media (prefers-color-scheme: dark) {\n.result-section.success-section h3[data-v-0e206bd8] {\n    color: #3fb950;\n}\n}\n.result-section.skipped-section[data-v-0e206bd8] {\n  border-color: #9a6700;\n}\n@media (prefers-color-scheme: dark) {\n.result-section.skipped-section[data-v-0e206bd8] {\n    border-color: #e09b13;\n}\n}\n.result-section.skipped-section h3[data-v-0e206bd8] {\n  color: #9a6700;\n}\n@media (prefers-color-scheme: dark) {\n.result-section.skipped-section h3[data-v-0e206bd8] {\n    color: #e09b13;\n}\n}\n.result-section.error-section[data-v-0e206bd8] {\n  border-color: #d73a49;\n}\n@media (prefers-color-scheme: dark) {\n.result-section.error-section[data-v-0e206bd8] {\n    border-color: #f85149;\n}\n}\n.result-section.error-section h3[data-v-0e206bd8] {\n  color: #d73a49;\n}\n@media (prefers-color-scheme: dark) {\n.result-section.error-section h3[data-v-0e206bd8] {\n    color: #f85149;\n}\n}\n.result-list[data-v-0e206bd8] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  max-height: 200px;\n  overflow-y: auto;\n}\n.result-list li[data-v-0e206bd8] {\n  padding: 8px 12px;\n  background: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-family: monospace;\n}\n.result-list li[data-v-0e206bd8]:last-child {\n  margin-bottom: 0;\n}\n.results-actions[data-v-0e206bd8] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  padding-top: 30px;\n  border-top: 1px solid var(--color-border);\n}.wizard-container[data-v-d2f4206c] {\n  display: flex;\n  flex-direction: column;\n  min-height: 500px;\n  padding: 20px;\n}\n.wizard-progress[data-v-d2f4206c] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 40px;\n  padding: 0 20px;\n}\n.progress-step[data-v-d2f4206c] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 1;\n  position: relative;\n}\n.progress-step[data-v-d2f4206c]:not(:last-child)::after {\n  content: "";\n  position: absolute;\n  top: 18px;\n  left: 50%;\n  right: -50%;\n  height: 2px;\n  background-color: var(--color-border-dark);\n  z-index: -1;\n}\n.progress-step.completed[data-v-d2f4206c]::after {\n  background-color: var(--color-primary-element);\n}\n.progress-dot[data-v-d2f4206c] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background-color: var(--color-background-dark);\n  border: 2px solid var(--color-border-dark);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  margin-bottom: 8px;\n  position: relative;\n  z-index: 1;\n}\n.progress-step.active .progress-dot[data-v-d2f4206c] {\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n  color: var(--color-primary-element-text);\n}\n.progress-step.completed .progress-dot[data-v-d2f4206c] {\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n  color: var(--color-primary-element-text);\n}\n.progress-label[data-v-d2f4206c] {\n  font-size: 12px;\n  text-align: center;\n  color: var(--color-text-maxcontrast);\n}\n.progress-step.active .progress-label[data-v-d2f4206c] {\n  color: var(--color-main-text);\n  font-weight: 600;\n}\n.wizard-content[data-v-d2f4206c] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px 0;\n}\n.wizard-actions[data-v-d2f4206c] {\n  display: flex;\n  gap: 12px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}\n.spacer[data-v-d2f4206c] {\n  flex: 1;\n}.disclaimer_group {\n  display: flex;\n  align-items: center;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.disclaimer_group .grow_title {\n  display: flex;\n  flex-grow: 1;\n  margin-inline-end: 12px;\n}\n.disclaimer_group .grow_title .material-design-icon {\n  margin-inline-start: 4px;\n}.user_settings {\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.user_settings .job_buttons_section {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 20px;\n  gap: 12px;\n}\n.user_settings .job_hints p {\n  margin-bottom: 0.5em;\n}\n.families-manager[data-v-b0578289] {\n  padding: 20px;\n}\n.families-list[data-v-b0578289] {\n  margin-bottom: 30px;\n}\n.families-list h3[data-v-b0578289] {\n  margin-bottom: 15px;\n  color: var(--color-text-lighter);\n}\n.family-item[data-v-b0578289] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px;\n  margin-bottom: 10px;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.family-item[data-v-b0578289]:hover {\n  background: var(--color-background-hover);\n}\n.family-content[data-v-b0578289] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  flex: 1;\n}\n.family-icon[data-v-b0578289] {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-primary);\n  color: white;\n  border-radius: 10px;\n  font-size: 24px;\n  flex-shrink: 0;\n}\n.family-info h4[data-v-b0578289] {\n  margin: 0 0 5px 0;\n  color: var(--color-text-light);\n}\n.family-type[data-v-b0578289] {\n  margin: 0;\n  font-family: monospace;\n  color: var(--color-text-lighter);\n  font-size: 0.9em;\n}\n.family-description[data-v-b0578289] {\n  margin: 5px 0 0 0;\n  color: var(--color-text-lighter);\n}\n.family-stats[data-v-b0578289] {\n  margin-top: 8px;\n}\n.types-count[data-v-b0578289] {\n  font-size: 0.8em;\n  color: var(--color-primary);\n  background: var(--color-primary-element-light);\n  padding: 2px 8px;\n  border-radius: 12px;\n}\n.family-actions[data-v-b0578289] {\n  display: flex;\n  gap: 10px;\n}\n.add-family-form[data-v-b0578289] {\n  padding: 20px;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n}\n.form-grid[data-v-b0578289] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-row[data-v-b0578289] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 15px;\n  align-items: start;\n}\n.form-field[data-v-b0578289] {\n  margin: 0;\n}\n.full-width[data-v-b0578289] {\n  grid-column: 1 / -1;\n}\n.form-actions[data-v-b0578289] {\n  display: flex;\n  justify-content: flex-start;\n}\n.modal-overlay[data-v-b0578289] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal-content[data-v-b0578289] {\n  background: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  width: 800px;\n  max-width: 90%;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.modal-content.large-modal[data-v-b0578289] {\n  width: 900px;\n  max-width: 95vw;\n}\n.modal-actions[data-v-b0578289] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n\n.types-manager[data-v-f2f32798] {\n  padding: 20px;\n}\n.header[data-v-f2f32798] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  margin-bottom: 25px;\n}\n.header h2[data-v-f2f32798] {\n  margin: 0;\n  color: var(--color-text-light);\n}\n.types-list[data-v-f2f32798] {\n  margin-bottom: 30px;\n}\n.list-description[data-v-f2f32798] {\n  color: var(--color-text-lighter);\n  margin-bottom: 20px;\n}\n.types-grid[data-v-f2f32798] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n}\n.type-card[data-v-f2f32798] {\n  background: var(--color-background-dark);\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.type-card[data-v-f2f32798]:hover {\n  background: var(--color-background-hover);\n  border-color: var(--color-primary);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.type-card-content[data-v-f2f32798] {\n  display: flex;\n  align-items: flex-start;\n  gap: 15px;\n  flex: 1;\n  margin-bottom: 15px;\n}\n.type-icon[data-v-f2f32798] {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-primary);\n  color: white;\n  border-radius: 10px;\n  font-size: 24px;\n  flex-shrink: 0;\n}\n.type-info[data-v-f2f32798] {\n  flex: 1;\n}\n.type-info h4[data-v-f2f32798] {\n  margin: 0 0 8px 0;\n  color: var(--color-text-light);\n  font-size: 1.1em;\n}\n.type-key[data-v-f2f32798] {\n  margin: 0 0 10px 0;\n  font-family: monospace;\n  color: var(--color-text-lighter);\n  font-size: 0.9em;\n  background: var(--color-background-darker);\n  padding: 4px 8px;\n  border-radius: 4px;\n  display: inline-block;\n}\n.type-description[data-v-f2f32798] {\n  margin: 0 0 10px 0;\n  color: var(--color-text-lighter);\n  font-size: 0.95em;\n  line-height: 1.4;\n}\n.type-badge[data-v-f2f32798] {\n  display: inline-block;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n.type-badge.option[data-v-f2f32798] {\n  background: var(--color-warning);\n  color: white;\n}\n.type-actions[data-v-f2f32798] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.configure-btn[data-v-f2f32798] {\n  width: 100%;\n}\n.secondary-actions[data-v-f2f32798] {\n  display: flex;\n  gap: 8px;\n}\n.edit-btn[data-v-f2f32798], .delete-btn[data-v-f2f32798] {\n  flex: 1;\n}\n.empty-state[data-v-f2f32798] {\n  text-align: center;\n  padding: 60px 40px;\n  color: var(--color-text-lighter);\n  background: var(--color-background-dark);\n  border-radius: 12px;\n  grid-column: 1 / -1;\n}\n.empty-state p[data-v-f2f32798] {\n  margin: 0;\n  font-size: 1.1em;\n}\n.add-type-form[data-v-f2f32798] {\n  padding: 25px;\n  background: var(--color-background-dark);\n  border-radius: 12px;\n}\n.form-grid[data-v-f2f32798] {\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n}\n.form-row[data-v-f2f32798] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.form-field[data-v-f2f32798] {\n  margin: 0;\n}\n.full-width[data-v-f2f32798] {\n  grid-column: 1 / -1;\n}\n.checkbox-field[data-v-f2f32798] {\n  grid-column: 1 / -1;\n  padding: 15px;\n  background: var(--color-background-darker);\n  border-radius: 8px;\n}\n.field-description[data-v-f2f32798] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n}\n.form-actions[data-v-f2f32798] {\n  display: flex;\n  justify-content: flex-start;\n}\n.modal-overlay[data-v-f2f32798] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal-content[data-v-f2f32798] {\n  background: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  width: 900px;\n  max-width: 90%;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.modal-content.large-modal[data-v-f2f32798] {\n  width: 1000px;\n  max-width: 95vw;\n}\n.modal-actions[data-v-f2f32798] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 15px;\n  margin-top: 25px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}\n\n.type-rights[data-v-60290e39] {\n    padding: 20px;\n}\n.header[data-v-60290e39] {\n    display: flex;\n    align-items: center;\n    gap: 15px;\n    margin-bottom: 25px;\n}\n.header h2[data-v-60290e39] {\n    margin: 0;\n    color: var(--color-text-light);\n}\n.description[data-v-60290e39] {\n    color: var(--color-text-lighter);\n    margin-bottom: 25px;\n}\n.settings-container[data-v-60290e39] {\n    padding: 20px;\n    background-color: var(--color-background-dark);\n    border-radius: 8px;\n}\n.settings-list[data-v-60290e39] {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n.setting-item[data-v-60290e39] {\n    padding: 15px;\n    background-color: var(--color-background-darker);\n    border-radius: 8px;\n}\n.setting-item label[data-v-60290e39] {\n    display: block;\n    margin-bottom: 8px;\n    font-weight: bold;\n}\n.editor-select[data-v-60290e39] {\n    max-width: 250px;\n    margin-top: 8px;\n}\n.setting-description[data-v-60290e39] {\n    margin: 8px 0 0 0;\n    font-size: 0.9em;\n    color: var(--color-text-lighter);\n    padding-left: 36px;\n}\n.no-selection[data-v-60290e39] {\n    text-align: center;\n    padding: 40px;\n    color: var(--color-text-lighter);\n}\n.ternary-mode-setting[data-v-60290e39] {\n    margin-left: 24px;\n    border-left: 2px solid var(--color-border);\n    padding-left: 16px;\n}\n.setting-label[data-v-60290e39] {\n    font-weight: 600;\n    margin-bottom: 12px;\n    color: var(--color-text-lighter);\n}\n.mode-options[data-v-60290e39] {\n    margin-bottom: 16px;\n    padding: 8px 0;\n}\n.mode-description[data-v-60290e39] {\n    margin: 4px 0 0 24px;\n    font-size: 0.9em;\n    color: var(--color-text-maxcontrast);\n    line-height: 1.4;\n}\n\n.type-status[data-v-832d89d2] {\n  padding: 20px;\n}\n.header[data-v-832d89d2] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  margin-bottom: 25px;\n}\n.header h2[data-v-832d89d2] {\n  margin: 0;\n  color: var(--color-text-light);\n}\n.description[data-v-832d89d2] {\n  margin-bottom: 25px;\n  color: var(--color-text-lighter);\n}\n.status-management[data-v-832d89d2] {\n  max-width: 1000px;\n}\n.status-list[data-v-832d89d2] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.empty-state[data-v-832d89d2] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n}\n.status-items[data-v-832d89d2] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.status-item[data-v-832d89d2] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px;\n  background-color: var(--color-background-darker);\n  border-radius: 8px;\n  border-left: 4px solid var(--color-primary);\n}\n.status-content[data-v-832d89d2] {\n  display: flex;\n  align-items: flex-start;\n  gap: 15px;\n  flex: 1;\n}\n.status-icon[data-v-832d89d2] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  color: white;\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n.status-icon[data-v-832d89d2] svg {\n  fill: white;\n}\n.status-info h4[data-v-832d89d2] {\n  margin: 0 0 5px 0;\n  font-weight: 600;\n}\n.status-key[data-v-832d89d2] {\n  margin: 0 0 8px 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  font-family: monospace;\n}\n.status-description[data-v-832d89d2] {\n  margin: 0 0 10px 0;\n  color: var(--color-text-lighter);\n  font-size: 0.95em;\n}\n.status-properties[data-v-832d89d2] {\n  display: flex;\n  gap: 10px;\n}\n.status-badge[data-v-832d89d2] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n.status-badge.final[data-v-832d89d2] {\n  background-color: var(--color-success);\n  color: white;\n}\n.status-badge.non-final[data-v-832d89d2] {\n  background-color: var(--color-warning);\n  color: white;\n}\n.status-actions[data-v-832d89d2] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.add-status-form[data-v-832d89d2] {\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.form-grid[data-v-832d89d2] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.checkbox-field[data-v-832d89d2] {\n  grid-column: span 2;\n}\n.field-description[data-v-832d89d2] {\n  margin: 5px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n}\n.modal-overlay[data-v-832d89d2] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.modal-content[data-v-832d89d2] {\n  background-color: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  width: 600px;\n  max-width: 90%;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.modal-actions[data-v-832d89d2] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 25px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}\n.no-selection[data-v-832d89d2] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n}\n@media (max-width: 768px) {\n.form-grid[data-v-832d89d2] {\n    grid-template-columns: 1fr;\n}\n.status-item[data-v-832d89d2] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 15px;\n}\n.status-actions[data-v-832d89d2] {\n    justify-content: center;\n}\n}\n\n.type-settings-modal[data-v-077dce28] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  min-height: 600px;\n  width: 100%;\n}\n.modal-header[data-v-077dce28] {\n  padding: 25px;\n  border-bottom: 1px solid var(--color-border);\n  background: var(--color-background-dark);\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.type-info[data-v-077dce28] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.type-icon[data-v-077dce28] {\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-primary);\n  color: white;\n  border-radius: 12px;\n  font-size: 28px;\n  flex-shrink: 0;\n}\n.type-details h3[data-v-077dce28] {\n  margin: 0 0 8px 0;\n  color: var(--color-text-light);\n  font-size: 1.5em;\n  font-weight: 600;\n}\n.type-key[data-v-077dce28] {\n  margin: 0;\n  font-family: monospace;\n  color: var(--color-text-lighter);\n  font-size: 1em;\n  background: var(--color-background-darker);\n  padding: 4px 8px;\n  border-radius: 4px;\n  display: inline-block;\n}\n.close-button[data-v-077dce28] {\n  background: var(--color-background-darker);\n  border: 1px solid var(--color-border);\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  color: var(--color-text-light);\n}\n.close-button[data-v-077dce28]:hover {\n  background: var(--color-background-hover);\n}\n\n/* Menu simple */\n.simple-menu[data-v-077dce28] {\n  display: flex;\n  background: var(--color-background-dark);\n  border-bottom: 1px solid var(--color-border);\n  padding: 0;\n  flex-shrink: 0;\n}\n.menu-item[data-v-077dce28] {\n  flex: 1;\n  background: none;\n  border: none;\n  padding: 16px 20px;\n  color: var(--color-text-lighter);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-bottom: 3px solid transparent;\n  font-size: 1em;\n  font-weight: 500;\n}\n.menu-item[data-v-077dce28]:hover {\n  background: var(--color-background-hover);\n  color: var(--color-text-light);\n}\n.menu-item.active[data-v-077dce28] {\n  color: var(--color-primary);\n  border-bottom-color: var(--color-primary);\n  background: var(--color-background-darker);\n}\n\n/* Contenu */\n.settings-content[data-v-077dce28] {\n  flex: 1;\n  padding: 30px;\n  overflow-y: auto;\n  background: var(--color-main-background);\n}\n\n.admin-settings-container[data-v-cd782848] {\n  min-height: 600px;\n  background: var(--color-main-background);\n  padding: 20px;\n}\n.breadcrumb[data-v-cd782848] {\n  margin-bottom: 25px;\n  padding: 15px 20px;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n  font-size: 1em;\n}\n.breadcrumb-item[data-v-cd782848] {\n  display: inline-flex;\n  align-items: center;\n}\n.breadcrumb-link[data-v-cd782848] {\n  background: none;\n  border: none;\n  color: var(--color-primary);\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n}\n.breadcrumb-link[data-v-cd782848]:hover {\n  background: var(--color-background-hover);\n}\n.breadcrumb-current[data-v-cd782848] {\n  color: var(--color-text-light);\n  font-weight: 600;\n  padding: 4px 8px;\n}\n.breadcrumb-separator[data-v-cd782848] {\n  margin: 0 10px;\n  color: var(--color-text-lighter);\n}\n.settings-content[data-v-cd782848] {\n  flex: 1;\n  overflow-y: auto;\n}\n[data-v-cd782848] .large-modal {\n  --width: 95vw;\n  --height: 90vh;\n  max-width: 1200px;\n  max-height: 800px;\n}\n[data-v-cd782848] .large-modal .modal-container {\n  width: 95vw;\n  height: 90vh;\n  max-width: 1200px;\n  max-height: 800px;\n}\n\n.tree-item[data-v-37a5142a] {\n  margin-bottom: 8px;\n}\n.tree-node[data-v-37a5142a] {\n  display: flex;\n  align-items: center;\n  padding: 8px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.tree-label[data-v-37a5142a] {\n  flex-grow: 1;\n  font-weight: bold;\n}\n.tree-actions[data-v-37a5142a] {\n  display: flex;\n  gap: 8px;\n}\n.tree-children[data-v-37a5142a] {\n  margin-left: 20px;\n  margin-top: 8px;\n}\n\n.category-location-manager[data-v-da2e3bfe] {\n  padding: 0;\n  max-width: 1200px;\n  margin: 0 auto;\n  height: auto;\n  min-height: 80vh;\n  background: var(--color-main-background);\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n/* Menu simple appliqué aux tabs - Style forcé */\n.tabs[data-v-da2e3bfe] {\n  display: flex;\n  background: var(--color-background-dark);\n  border-bottom: 1px solid var(--color-border);\n  padding: 0;\n  flex-shrink: 0;\n  border-radius: 12px 12px 0 0;\n}\n.tabs[data-v-da2e3bfe] .button-vue {\n  flex: 1 !important;\n  background: none !important;\n  border: none !important;\n  padding: 16px 20px !important;\n  color: var(--color-text-lighter) !important;\n  cursor: pointer;\n  transition: all 0.2s ease !important;\n  border-bottom: 3px solid transparent !important;\n  font-size: 1em !important;\n  font-weight: 500 !important;\n  margin: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  min-height: auto !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n.tabs[data-v-da2e3bfe] .button-vue:hover {\n  background: var(--color-background-hover) !important;\n  color: var(--color-text-light) !important;\n}\n.tabs[data-v-da2e3bfe] .button-vue.active {\n  color: var(--color-primary) !important;\n  border-bottom-color: var(--color-primary) !important;\n  background: var(--color-background-darker) !important;\n}\n.tabs[data-v-da2e3bfe] .button-vue--vue-secondary {\n  --button-background-hover: var(--color-background-hover) !important;\n  --button-color-hover: var(--color-text-light) !important;\n}\n.tabs[data-v-da2e3bfe] .button-vue--vue-secondary.active {\n  --button-background: var(--color-background-darker) !important;\n  --button-color: var(--color-primary) !important;\n  --button-border-color: transparent !important;\n}\n.tab-content[data-v-da2e3bfe] {\n  margin-top: 0;\n  background: var(--color-main-background);\n  border-radius: 0 0 12px 12px;\n  padding: 30px;\n  height: auto;\n  overflow: visible;\n  flex: 1;\n}\n.add-form[data-v-da2e3bfe] {\n  margin-bottom: 30px;\n  padding: 25px;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n  border: 1px solid var(--color-border);\n}\n.add-form h3[data-v-da2e3bfe] {\n  margin: 0 0 20px 0;\n  color: var(--color-text);\n  font-weight: 600;\n  font-size: 18px;\n}\n.form-fields[data-v-da2e3bfe] {\n  display: flex;\n  gap: 15px;\n  align-items: end;\n  flex-wrap: wrap;\n}\n.form-fields .nc-input-field[data-v-da2e3bfe],\n.form-fields .nc-select[data-v-da2e3bfe] {\n  flex: 1;\n  min-width: 200px;\n}\n.tree-view[data-v-da2e3bfe] {\n  margin-top: 30px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.tree-view h3[data-v-da2e3bfe] {\n  margin: 0 0 20px 0;\n  color: var(--color-text);\n  font-weight: 600;\n  font-size: 18px;\n  padding-bottom: 10px;\n  border-bottom: 2px solid var(--color-border);\n}\n.tree-container[data-v-da2e3bfe] {\n  margin-top: 15px;\n  border: 1px solid var(--color-border);\n  border-radius: 8px;\n  padding: 20px;\n  background: var(--color-background-dark);\n  max-height: 500px;\n  overflow-y: auto;\n  flex: 1;\n}\n.loading[data-v-da2e3bfe],\n.error[data-v-da2e3bfe] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n  font-size: 16px;\n}\n.error[data-v-da2e3bfe] {\n  color: var(--color-error);\n  background: var(--color-error-background);\n  border: 1px solid var(--color-error-border);\n  border-radius: 8px;\n  margin: 20px 0;\n}\n.modal[data-v-da2e3bfe] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  backdrop-filter: blur(4px);\n}\n.modal-content[data-v-da2e3bfe] {\n  background: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  min-width: 400px;\n  max-width: 500px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  border: 1px solid var(--color-border);\n  max-height: 80vh;\n  overflow-y: auto;\n}\n.modal-content h3[data-v-da2e3bfe] {\n  margin: 0 0 20px 0;\n  color: var(--color-text);\n  font-weight: 600;\n  font-size: 20px;\n}\n.modal-actions[data-v-da2e3bfe] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  margin-top: 25px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}\n.category-location-manager > div[data-v-da2e3bfe]:last-child {\n  max-height: calc(100vh - 100px);\n  overflow-y: auto;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n.category-location-manager[data-v-da2e3bfe] {\n    padding: 0;\n    min-height: auto;\n    margin: 10px;\n}\n.tabs[data-v-da2e3bfe] {\n    flex-direction: column;\n    gap: 0;\n}\n.tabs[data-v-da2e3bfe] .button-vue {\n    padding: 16px 20px !important;\n    border-bottom: 2px solid transparent !important;\n    border-right: 3px solid transparent !important;\n    text-align: left !important;\n}\n.tabs[data-v-da2e3bfe] .button-vue.active {\n    border-bottom-color: transparent !important;\n    border-right-color: var(--color-primary) !important;\n}\n.tab-content[data-v-da2e3bfe] {\n    padding: 20px;\n}\n.form-fields[data-v-da2e3bfe] {\n    flex-direction: column;\n    align-items: stretch;\n}\n.form-fields .nc-input-field[data-v-da2e3bfe],\n  .form-fields .nc-select[data-v-da2e3bfe] {\n    min-width: auto;\n}\n.modal-content[data-v-da2e3bfe] {\n    min-width: auto;\n    margin: 20px;\n    padding: 20px;\n    max-height: 70vh;\n}\n.tree-container[data-v-da2e3bfe] {\n    max-height: 400px;\n}\n}\n.tab-content[data-v-da2e3bfe] {\n  animation: fadeIn-da2e3bfe 0.3s ease-in-out;\n}\n@keyframes fadeIn-da2e3bfe {\nfrom {\n    opacity: 0;\n    transform: translateY(10px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.category-location-manager[data-v-da2e3bfe] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.category-location-manager > div[data-v-da2e3bfe]:last-child {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.tab-content[data-v-da2e3bfe] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.rights-management[data-v-fb7cbc5e] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-fb7cbc5e] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-fb7cbc5e] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-fb7cbc5e] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-fb7cbc5e] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.rights-management[data-v-14c25bb2] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-14c25bb2] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-14c25bb2] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-14c25bb2] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-14c25bb2] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const appName = "agora";
const appVersion = "1.7.0-rc1";
import { A as defineStore, aR as generateOcsUrl, aS as cancelableClient, d as defineComponent, q as translate, _ as _export_sfc, c as createElementBlock, o as openBlock, k as createBaseVNode, t as toDisplayString, T as Fragment, U as renderList, E as normalizeClass, l as createCommentVNode, B as createTextVNode, b as computed, s as onMounted, aV as ref, a7 as NcButton, aP as NcEmptyContent, ak as NcLoadingIcon, f as createBlock, j as createVNode, g as withCtx, w as watch, aM as NcModal, h as resolveDynamicComponent, i as mergeProps, a5 as withDirectives, a6 as vShow, aZ as vModelText, C as purify, ax as withModifiers, ai as resolveComponent, n as normalizeStyle, v as normalizeProps, x as guardReactiveProps, y as createApp, z as pinia } from "./TernarySupportIcon.vue_vue_type_style_index_0_scoped_ef057a6f_lang-CTOMjiel.chunk.mjs";
import { I as InputDiv, a as NcAppSettingsDialog, N as NcSettingsSection } from "./index-DqcOgkSx.chunk.mjs";
import { L as Logger, d as useAppSettingsStore, e as gfmHeadingId, f as d, h as adminJobs, I as InquiryGeneralIcons, s as showError, S as StatusIcons } from "./NcDashboardWidget-DCBQdRFz-CKLTTnN9.chunk.mjs";
import { F as FlexSettings } from "./FlexSettings-B-fGiEhz.chunk.mjs";
import { _ as _sfc_main$A, N as NcCheckboxRadioSwitch, a as NcSelect, b as NcInputField } from "./NcRichText-DJlaHs_Q-D0kSgDEf.chunk.mjs";
import { N as NcNoteCard, a as NcTextArea, R as RadioGroupDiv, C as CardDiv } from "./markdown-wF436puY.chunk.mjs";
const useTemplateWizardStore = defineStore("templateWizard", {
  state: () => ({
    isOpen: false,
    currentStep: "use-case",
    steps: ["use-case", "template-selection", "language", "preview", "summary", "importing", "results"],
    templates: [],
    loadingTemplates: false,
    selectedUseCase: null,
    selectedTemplate: null,
    selectedLanguage: null,
    customTemplate: null,
    editableData: null,
    importing: false,
    importResult: null,
    importError: null,
    isDatabaseEmpty: null
  }),
  getters: {
    currentStepIndex: (state) => state.steps.indexOf(state.currentStep),
    canGoNext: (state) => {
      switch (state.currentStep) {
        case "use-case":
          return state.selectedUseCase !== null;
        case "template-selection":
          return state.selectedTemplate !== null || state.customTemplate !== null;
        case "language":
          return state.selectedLanguage !== null;
        case "preview":
          return state.editableData !== null;
        case "summary":
          return true;
        default:
          return false;
      }
    },
    canGoPrevious: (state) => {
      return state.currentStepIndex > 0 && !state.importing;
    },
    availableTemplates: (state) => {
      if (!state.selectedUseCase) {
        return state.templates;
      }
      if (state.selectedUseCase === "custom") {
        return state.templates.filter((t) => {
          const useCase = t.use_case || "";
          return !useCase.startsWith("citizen_") && !useCase.startsWith("default_") && !useCase.startsWith("enterprise_") && !useCase.startsWith("business_") && !useCase.startsWith("education_") && !useCase.startsWith("research_");
        });
      }
      if (state.selectedUseCase === "citizen_participation") {
        return state.templates.filter((t) => {
          const useCase = t.use_case || "";
          return useCase.startsWith("citizen_") || useCase.startsWith("default_");
        });
      }
      if (state.selectedUseCase === "enterprise") {
        return state.templates.filter((t) => {
          const useCase = t.use_case || "";
          return useCase.startsWith("enterprise_") || useCase.startsWith("business_");
        });
      }
      if (state.selectedUseCase === "education") {
        return state.templates.filter((t) => {
          const useCase = t.use_case || "";
          return useCase.startsWith("education_") || useCase.startsWith("research_");
        });
      }
      return state.templates;
    },
    availableLanguages: (state) => {
      if (state.selectedTemplate?.content) {
        return state.selectedTemplate.content.template_info.available_languages || [];
      }
      if (state.customTemplate) {
        return state.customTemplate.template_info.available_languages || [];
      }
      return [];
    }
  },
  actions: {
    async loadTemplates() {
      this.loadingTemplates = true;
      try {
        const url = generateOcsUrl("/apps/agora/api/v1.0/templates");
        const response = await cancelableClient.get(url);
        this.templates = response.data.ocs.data;
        Logger.info("Loaded templates:", this.templates);
      } catch (error) {
        Logger.error("Failed to load templates:", error);
        throw error;
      } finally {
        this.loadingTemplates = false;
      }
    },
    async loadTemplateDetails(identifier) {
      try {
        const url = generateOcsUrl(`/apps/agora/api/v1.0/templates/${identifier}`);
        const response = await cancelableClient.get(url);
        this.selectedTemplate = response.data.ocs.data;
        Logger.info("Loaded template details:", this.selectedTemplate);
      } catch (error) {
        Logger.error("Failed to load template details:", error);
        throw error;
      }
    },
    async checkDatabaseEmpty() {
      try {
        const url = generateOcsUrl("/apps/agora/api/v1.0/templates/check-empty");
        const response = await cancelableClient.get(url);
        this.isDatabaseEmpty = response.data.ocs.data.empty;
        Logger.info("Database empty check:", this.isDatabaseEmpty);
      } catch (error) {
        Logger.error("Failed to check database:", error);
        throw error;
      }
    },
    async importTemplate() {
      if (!this.editableData) {
        throw new Error("No editable data available");
      }
      if (!this.selectedLanguage) {
        throw new Error("No language selected");
      }
      this.importing = true;
      this.importError = null;
      this.currentStep = "importing";
      try {
        const url = generateOcsUrl("/apps/agora/api/v1.0/templates/import-data");
        const response = await cancelableClient.post(url, {
          templateData: this.editableData,
          language: this.selectedLanguage
        });
        this.importResult = response.data.ocs.data.results;
        this.currentStep = "results";
        Logger.info("Import completed:", this.importResult);
      } catch (error) {
        this.importError = error instanceof Error ? error.message : "Unknown error";
        Logger.error("Import failed:", error);
        throw error;
      } finally {
        this.importing = false;
      }
    },
    async validateTemplate(template) {
      try {
        const url = generateOcsUrl("/apps/agora/api/v1.0/templates/validate");
        const response = await cancelableClient.post(url, { template });
        return response.data.ocs.data;
      } catch (error) {
        Logger.error("Template validation failed:", error);
        throw error;
      }
    },
    openWizard() {
      this.isOpen = true;
      this.currentStep = "use-case";
      this.loadTemplates();
      this.checkDatabaseEmpty();
    },
    closeWizard() {
      this.isOpen = false;
      this.reset();
    },
    nextStep() {
      const currentIndex = this.currentStepIndex;
      if (currentIndex < this.steps.length - 1) {
        const nextStep = this.steps[currentIndex + 1];
        if (nextStep === "preview" && this.selectedLanguage) {
          this.prepareEditableData();
        }
        this.currentStep = nextStep;
      }
    },
    previousStep() {
      const currentIndex = this.currentStepIndex;
      if (currentIndex > 0) {
        this.currentStep = this.steps[currentIndex - 1];
      }
    },
    goToStep(step) {
      this.currentStep = step;
    },
    selectUseCase(useCase) {
      this.selectedUseCase = useCase;
    },
    async selectTemplate(template) {
      this.selectedTemplate = template;
      this.customTemplate = null;
      if (!template.content) {
        await this.loadTemplateDetails(template.name);
      }
    },
    selectLanguage(language) {
      this.selectedLanguage = language;
    },
    uploadCustomTemplate(template) {
      this.customTemplate = template;
      this.selectedTemplate = null;
    },
    prepareEditableData() {
      const template = this.selectedTemplate?.content || this.customTemplate;
      if (!template || !this.selectedLanguage) {
        Logger.error("Cannot prepare editable data: missing template or language");
        return;
      }
      const clonedTemplate = JSON.parse(JSON.stringify(template));
      this.editableData = this.extractLanguageText(clonedTemplate, this.selectedLanguage);
      Logger.info("Prepared editable data:", this.editableData);
    },
    extractLanguageText(template, language) {
      const extracted = { ...template };
      Logger.info("[extractLanguageText] Starting extraction with language:", language);
      const sections = [
        "inquiry_families",
        "inquiry_types",
        "inquiry_statuses",
        "option_types",
        "inquiry_group_types",
        "categories",
        "locations"
      ];
      const isMultiLangObject = (obj) => {
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
          return false;
        }
        const keys = Object.keys(obj);
        const langKeys = ["en", "fr", "de", "gsw", "it", "es", "pt", "nl", "ru", "zh", "ja", "ko"];
        const hasLangKey = keys.some((k) => langKeys.includes(k));
        const allStringsOrEmpty = keys.every(
          (k) => obj[k] === void 0 || obj[k] === null || typeof obj[k] === "string"
        );
        return hasLangKey && allStringsOrEmpty;
      };
      const extractLangString = (obj) => {
        if (obj[language] !== void 0 && obj[language] !== "") {
          return obj[language];
        }
        if (obj.en !== void 0 && obj.en !== "") {
          return obj.en;
        }
        const keys = Object.keys(obj);
        const firstKey = keys.find((k) => obj[k] !== void 0 && obj[k] !== "");
        if (firstKey) {
          return obj[firstKey];
        }
        Logger.warn("[extractLangString] No valid translation found in object:", obj);
        return "";
      };
      const processValue = (value, path = "") => {
        if (value === null || value === void 0) {
          return value;
        }
        if (isMultiLangObject(value)) {
          const extracted2 = extractLangString(value);
          Logger.debug(`[processValue] Extracted "${extracted2}" from multi-lang at ${path}`);
          return extracted2;
        }
        if (Array.isArray(value)) {
          return value.map((item, idx) => processValue(item, `${path}[${idx}]`));
        }
        if (typeof value === "object") {
          const processedObj = {};
          Object.keys(value).forEach((key) => {
            processedObj[key] = processValue(value[key], `${path}.${key}`);
          });
          return processedObj;
        }
        return value;
      };
      sections.forEach((section) => {
        if (extracted[section] && Array.isArray(extracted[section])) {
          Logger.info(`[extractLanguageText] Processing section: ${section} (${extracted[section].length} items)`);
          extracted[section] = extracted[section].map((item, idx) => {
            const processed = processValue(item, `${section}[${idx}]`);
            if (idx === 0 && processed.label !== void 0) {
              Logger.info(`[extractLanguageText] First ${section} item label:`, processed.label);
            }
            return processed;
          });
        }
      });
      Logger.info("[extractLanguageText] Extraction complete");
      return extracted;
    },
    updateEditableItem(section, index, updatedItem) {
      if (!this.editableData || !this.editableData[section]) {
        return;
      }
      this.editableData[section][index] = updatedItem;
    },
    removeEditableItem(section, index) {
      if (!this.editableData || !this.editableData[section]) {
        return;
      }
      this.editableData[section].splice(index, 1);
    },
    addEditableItem(section, item) {
      if (!this.editableData) {
        return;
      }
      if (!this.editableData[section]) {
        this.editableData[section] = [];
      }
      this.editableData[section].push(item);
    },
    reset() {
      this.currentStep = "use-case";
      this.selectedUseCase = null;
      this.selectedTemplate = null;
      this.selectedLanguage = null;
      this.customTemplate = null;
      this.editableData = null;
      this.importing = false;
      this.importResult = null;
      this.importError = null;
    }
  }
});
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "StepUseCaseSelection",
  setup(__props, { expose: __expose }) {
    __expose();
    const wizardStore = useTemplateWizardStore();
    const useCases = [
      {
        id: "citizen_participation",
        title: translate("agora", "Citizen Participation"),
        description: translate("agora", "For municipalities, cantons, communes and government entities"),
        icon: "🏛️",
        examples: [
          translate("agora", "Deliberative processes (debates, proposals, petitions)"),
          translate("agora", "Legislative processes (law proposals, amendments)"),
          translate("agora", "Administrative requests and grievances"),
          translate("agora", "Social services (housing, childcare, scholarships)")
        ]
      },
      {
        id: "enterprise",
        title: translate("agora", "Enterprise & Business"),
        description: translate("agora", "For companies, departments and business operations"),
        icon: "🏢",
        examples: [
          translate("agora", "IT Services (ideas, automation, service requests)"),
          translate("agora", "Human Resources (training, policies, workplace)"),
          translate("agora", "Facility Management (infrastructure, sustainability)"),
          translate("agora", "Finance & Procurement (budget, vendor feedback)")
        ]
      },
      {
        id: "education",
        title: translate("agora", "Education & Research"),
        description: translate("agora", "For schools, universities and research institutions"),
        icon: "🎓",
        examples: [
          translate("agora", "Student feedback and suggestions"),
          translate("agora", "Research project proposals"),
          translate("agora", "Course evaluations and improvements"),
          translate("agora", "Campus facility requests")
        ]
      },
      {
        id: "custom",
        title: translate("agora", "Custom Setup"),
        description: translate("agora", "Start from scratch or import your own template"),
        icon: "🛠️",
        examples: [
          translate("agora", "Upload AI-generated template"),
          translate("agora", "Import custom JSON configuration"),
          translate("agora", "Start with empty configuration"),
          translate("agora", "Use community templates")
        ]
      }
    ];
    const selectUseCase = (useCase) => {
      wizardStore.selectUseCase(useCase);
    };
    const __returned__ = { wizardStore, useCases, selectUseCase, get t() {
      return translate;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$z = { class: "use-case-selection" };
const _hoisted_2$r = { class: "use-case-header" };
const _hoisted_3$l = { class: "subtitle" };
const _hoisted_4$j = { class: "use-case-grid" };
const _hoisted_5$f = ["onClick"];
const _hoisted_6$f = { class: "card-icon" };
const _hoisted_7$e = { class: "card-title" };
const _hoisted_8$e = { class: "card-description" };
const _hoisted_9$d = { class: "card-examples" };
const _hoisted_10$a = {
  key: 0,
  class: "selected-indicator"
};
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$z, [
    createBaseVNode("div", _hoisted_2$r, [
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "What is your primary use case?")),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        _hoisted_3$l,
        toDisplayString($setup.t("agora", "Select the option that best matches your organization's needs")),
        1
        /* TEXT */
      )
    ]),
    createBaseVNode("div", _hoisted_4$j, [
      (openBlock(), createElementBlock(
        Fragment,
        null,
        renderList($setup.useCases, (useCase) => {
          return createBaseVNode("div", {
            key: useCase.id,
            class: normalizeClass(["use-case-card", { selected: $setup.wizardStore.selectedUseCase === useCase.id }]),
            onClick: ($event) => $setup.selectUseCase(useCase.id)
          }, [
            createBaseVNode(
              "div",
              _hoisted_6$f,
              toDisplayString(useCase.icon),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "h3",
              _hoisted_7$e,
              toDisplayString(useCase.title),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "p",
              _hoisted_8$e,
              toDisplayString(useCase.description),
              1
              /* TEXT */
            ),
            createBaseVNode("ul", _hoisted_9$d, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(useCase.examples, (example, index) => {
                  return openBlock(), createElementBlock(
                    "li",
                    { key: index },
                    toDisplayString(example),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            $setup.wizardStore.selectedUseCase === useCase.id ? (openBlock(), createElementBlock("div", _hoisted_10$a, [
              _cache[0] || (_cache[0] = createBaseVNode(
                "span",
                { class: "check-icon" },
                "✓",
                -1
                /* CACHED */
              )),
              createTextVNode(
                " " + toDisplayString($setup.t("agora", "Selected")),
                1
                /* TEXT */
              )
            ])) : createCommentVNode("v-if", true)
          ], 10, _hoisted_5$f);
        }),
        64
        /* STABLE_FRAGMENT */
      ))
    ])
  ]);
}
const StepUseCaseSelection = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z], ["__scopeId", "data-v-cbe6b281"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/steps/StepUseCaseSelection.vue"]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "StepTemplateSelection",
  setup(__props, { expose: __expose }) {
    __expose();
    const wizardStore = useTemplateWizardStore();
    const templates = computed(() => wizardStore.availableTemplates);
    const isLoading = computed(() => wizardStore.loadingTemplates);
    const fileInput = ref(null);
    const uploadError = ref(null);
    const showHelp = ref(false);
    onMounted(async () => {
      if (wizardStore.templates.length === 0 && !wizardStore.loadingTemplates) {
        await wizardStore.loadTemplates();
      }
    });
    const selectTemplate = (template) => {
      wizardStore.selectTemplate(template);
    };
    const formatCount = (count, label) => {
      return `${count} ${label}${count !== 1 ? "s" : ""}`;
    };
    const triggerFileUpload = () => {
      fileInput.value?.click();
    };
    const handleFileUpload = async (event) => {
      const target = event.target;
      const file = target.files?.[0];
      if (!file) return;
      uploadError.value = null;
      try {
        const text = await file.text();
        const template = JSON.parse(text);
        if (!template.template_info || !template.template_info.name) {
          throw new Error("Invalid template format: missing template_info");
        }
        await wizardStore.validateTemplate(template);
        wizardStore.uploadCustomTemplate(template);
      } catch (error) {
        uploadError.value = error instanceof Error ? error.message : "Failed to parse template file";
        console.error("Template upload error:", error);
      }
    };
    const downloadSchema = async () => {
      try {
        const url = generateOcsUrl("/apps/agora/api/v1.0/templates/schema");
        const response = await cancelableClient.get(url);
        if (response.data?.ocs?.data?.error) {
          throw new Error(response.data.ocs.data.error);
        }
        const schema = response.data.ocs.data;
        const blob = new Blob([JSON.stringify(schema, null, 2)], { type: "application/json" });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "agora-template-schema.json";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Failed to download schema:", error);
        uploadError.value = error instanceof Error ? error.message : "Failed to download schema file";
      }
    };
    const downloadInstructions = async () => {
      try {
        const url = generateOcsUrl("/apps/agora/api/v1.0/templates/instructions");
        const response = await cancelableClient.get(url);
        if (response.data?.ocs?.data?.error) {
          throw new Error(response.data.ocs.data.error);
        }
        const instructions = response.data.ocs.data.content;
        const blob = new Blob([instructions], { type: "text/markdown" });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = response.data.ocs.data.filename || "agora-template-instructions.md";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Failed to download instructions:", error);
        uploadError.value = error instanceof Error ? error.message : "Failed to download instructions file";
      }
    };
    const toggleHelp = () => {
      showHelp.value = !showHelp.value;
    };
    const __returned__ = { wizardStore, templates, isLoading, fileInput, uploadError, showHelp, selectTemplate, formatCount, triggerFileUpload, handleFileUpload, downloadSchema, downloadInstructions, toggleHelp, get t() {
      return translate;
    }, get NcLoadingIcon() {
      return NcLoadingIcon;
    }, get NcEmptyContent() {
      return NcEmptyContent;
    }, get NcButton() {
      return NcButton;
    }, get NcNoteCard() {
      return NcNoteCard;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$y = { class: "template-selection" };
const _hoisted_2$q = { class: "template-header" };
const _hoisted_3$k = {
  key: 0,
  class: "subtitle"
};
const _hoisted_4$i = {
  key: 1,
  class: "subtitle"
};
const _hoisted_5$e = {
  key: 0,
  class: "upload-section"
};
const _hoisted_6$e = { class: "help-section" };
const _hoisted_7$d = {
  key: 0,
  class: "help-content"
};
const _hoisted_8$d = { class: "help-actions" };
const _hoisted_9$c = { class: "help-instructions" };
const _hoisted_10$9 = { class: "ai-list" };
const _hoisted_11$9 = {
  key: 1,
  class: "divider"
};
const _hoisted_12$8 = {
  key: 4,
  class: "template-list"
};
const _hoisted_13$8 = ["onClick"];
const _hoisted_14$8 = { class: "template-card-header" };
const _hoisted_15$7 = { class: "template-name" };
const _hoisted_16$7 = { class: "template-version" };
const _hoisted_17$7 = { class: "template-description" };
const _hoisted_18$6 = { class: "template-meta" };
const _hoisted_19$6 = { class: "meta-item" };
const _hoisted_20$6 = { class: "meta-label" };
const _hoisted_21$6 = { class: "meta-value" };
const _hoisted_22$4 = { class: "meta-item" };
const _hoisted_23$4 = { class: "meta-label" };
const _hoisted_24$4 = { class: "meta-value" };
const _hoisted_25$4 = { class: "template-stats" };
const _hoisted_26$2 = { class: "stat-item" };
const _hoisted_27$2 = { class: "stat-value" };
const _hoisted_28$2 = { class: "stat-label" };
const _hoisted_29$2 = { class: "stat-item" };
const _hoisted_30$2 = { class: "stat-value" };
const _hoisted_31$2 = { class: "stat-label" };
const _hoisted_32$2 = { class: "stat-item" };
const _hoisted_33$2 = { class: "stat-value" };
const _hoisted_34$2 = { class: "stat-label" };
const _hoisted_35$2 = { class: "stat-item" };
const _hoisted_36$1 = { class: "stat-value" };
const _hoisted_37$1 = { class: "stat-label" };
const _hoisted_38$1 = {
  key: 0,
  class: "selected-badge"
};
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$y, [
    createBaseVNode("div", _hoisted_2$q, [
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Select a Template")),
        1
        /* TEXT */
      ),
      $setup.wizardStore.selectedUseCase === "custom" ? (openBlock(), createElementBlock(
        "p",
        _hoisted_3$k,
        toDisplayString($setup.t("agora", "Choose a pre-configured template or upload your own")),
        1
        /* TEXT */
      )) : (openBlock(), createElementBlock(
        "p",
        _hoisted_4$i,
        toDisplayString($setup.t("agora", "Choose a pre-configured template for your use case")),
        1
        /* TEXT */
      ))
    ]),
    createCommentVNode(" Custom Template Upload Section - Only for Custom Setup "),
    $setup.wizardStore.selectedUseCase === "custom" ? (openBlock(), createElementBlock("div", _hoisted_5$e, [
      createVNode($setup["NcButton"], {
        type: "secondary",
        onClick: $setup.triggerFileUpload
      }, {
        icon: withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode(
            "span",
            { class: "icon-upload" },
            null,
            -1
            /* CACHED */
          )
        ])]),
        default: withCtx(() => [
          createTextVNode(
            " " + toDisplayString($setup.t("agora", "Upload Custom Template")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }),
      createBaseVNode(
        "input",
        {
          ref: "fileInput",
          type: "file",
          accept: "application/json,.json",
          style: { "display": "none" },
          onChange: $setup.handleFileUpload
        },
        null,
        544
        /* NEED_HYDRATION, NEED_PATCH */
      ),
      $setup.uploadError ? (openBlock(), createBlock($setup["NcNoteCard"], {
        key: 0,
        type: "error",
        class: "upload-error"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.uploadError),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      $setup.wizardStore.customTemplate ? (openBlock(), createBlock($setup["NcNoteCard"], {
        key: 1,
        type: "success",
        class: "upload-success"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Custom template loaded: {name}", { name: $setup.wizardStore.customTemplate.template_info.name })),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createCommentVNode(" Help Section for Creating Templates "),
      createBaseVNode("div", _hoisted_6$e, [
        createVNode($setup["NcButton"], {
          type: "tertiary",
          onClick: $setup.toggleHelp
        }, {
          icon: withCtx(() => [
            createBaseVNode(
              "span",
              {
                class: normalizeClass($setup.showHelp ? "icon-triangle-s" : "icon-triangle-e")
              },
              null,
              2
              /* CLASS */
            )
          ]),
          default: withCtx(() => [
            createTextVNode(
              " " + toDisplayString($setup.t("agora", "Need help creating a template?")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }),
        $setup.showHelp ? (openBlock(), createElementBlock("div", _hoisted_7$d, [
          createVNode($setup["NcNoteCard"], { type: "info" }, {
            default: withCtx(() => [
              createBaseVNode(
                "p",
                null,
                toDisplayString($setup.t("agora", "Use AI assistants like ChatGPT, Claude, Gemini, or local LLMs to generate custom templates.")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createBaseVNode("div", _hoisted_8$d, [
            createVNode($setup["NcButton"], {
              type: "primary",
              onClick: $setup.downloadSchema
            }, {
              icon: withCtx(() => [..._cache[1] || (_cache[1] = [
                createBaseVNode(
                  "span",
                  { class: "icon-download" },
                  null,
                  -1
                  /* CACHED */
                )
              ])]),
              default: withCtx(() => [
                createTextVNode(
                  " " + toDisplayString($setup.t("agora", "Download Schema")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }),
            createVNode($setup["NcButton"], {
              type: "secondary",
              onClick: $setup.downloadInstructions
            }, {
              icon: withCtx(() => [..._cache[2] || (_cache[2] = [
                createBaseVNode(
                  "span",
                  { class: "icon-info" },
                  null,
                  -1
                  /* CACHED */
                )
              ])]),
              default: withCtx(() => [
                createTextVNode(
                  " " + toDisplayString($setup.t("agora", "Download Instructions")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          createBaseVNode("div", _hoisted_9$c, [
            createBaseVNode(
              "h4",
              null,
              toDisplayString($setup.t("agora", "Quick Guide:")),
              1
              /* TEXT */
            ),
            createBaseVNode("ol", null, [
              createBaseVNode(
                "li",
                null,
                toDisplayString($setup.t("agora", "Download the schema and instructions above")),
                1
                /* TEXT */
              ),
              createBaseVNode(
                "li",
                null,
                toDisplayString($setup.t("agora", "Open your preferred AI assistant (ChatGPT, Claude, Gemini, or local LLM)")),
                1
                /* TEXT */
              ),
              createBaseVNode(
                "li",
                null,
                toDisplayString($setup.t("agora", "Provide the schema and describe your use case")),
                1
                /* TEXT */
              ),
              createBaseVNode(
                "li",
                null,
                toDisplayString($setup.t("agora", "Copy the generated JSON and save it as a .json file")),
                1
                /* TEXT */
              ),
              createBaseVNode(
                "li",
                null,
                toDisplayString($setup.t("agora", "Upload the file using the button above")),
                1
                /* TEXT */
              )
            ]),
            createBaseVNode(
              "h4",
              null,
              toDisplayString($setup.t("agora", "Recommended AI Tools:")),
              1
              /* TEXT */
            ),
            createBaseVNode("ul", _hoisted_10$9, [
              createBaseVNode("li", null, [
                _cache[3] || (_cache[3] = createBaseVNode(
                  "strong",
                  null,
                  "ChatGPT:",
                  -1
                  /* CACHED */
                )),
                createTextVNode(
                  " " + toDisplayString($setup.t("agora", "Best for complex templates with many types")),
                  1
                  /* TEXT */
                )
              ]),
              createBaseVNode("li", null, [
                _cache[4] || (_cache[4] = createBaseVNode(
                  "strong",
                  null,
                  "Claude:",
                  -1
                  /* CACHED */
                )),
                createTextVNode(
                  " " + toDisplayString($setup.t("agora", "Best for detailed, well-structured templates")),
                  1
                  /* TEXT */
                )
              ]),
              createBaseVNode("li", null, [
                _cache[5] || (_cache[5] = createBaseVNode(
                  "strong",
                  null,
                  "Gemini:",
                  -1
                  /* CACHED */
                )),
                createTextVNode(
                  " " + toDisplayString($setup.t("agora", "Best for multilingual templates")),
                  1
                  /* TEXT */
                )
              ]),
              createBaseVNode("li", null, [
                _cache[6] || (_cache[6] = createBaseVNode(
                  "strong",
                  null,
                  "Local LLMs:",
                  -1
                  /* CACHED */
                )),
                createTextVNode(
                  " " + toDisplayString($setup.t("agora", "Best for privacy-sensitive use cases (Ollama, LM Studio)")),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ])) : createCommentVNode("v-if", true)
      ])
    ])) : createCommentVNode("v-if", true),
    $setup.wizardStore.selectedUseCase === "custom" && !$setup.wizardStore.customTemplate ? (openBlock(), createElementBlock("div", _hoisted_11$9, [
      createBaseVNode(
        "span",
        null,
        toDisplayString($setup.t("agora", "or choose from catalog")),
        1
        /* TEXT */
      )
    ])) : createCommentVNode("v-if", true),
    $setup.isLoading && !$setup.wizardStore.customTemplate ? (openBlock(), createBlock($setup["NcLoadingIcon"], {
      key: 2,
      size: 64
    })) : $setup.templates.length === 0 && !$setup.wizardStore.customTemplate ? (openBlock(), createBlock($setup["NcEmptyContent"], {
      key: 3,
      name: $setup.t("agora", "No templates available"),
      description: $setup.t("agora", "Please check your installation or upload a custom template")
    }, {
      icon: withCtx(() => [..._cache[7] || (_cache[7] = [
        createBaseVNode(
          "span",
          { class: "icon-folder" },
          null,
          -1
          /* CACHED */
        )
      ])]),
      _: 1
      /* STABLE */
    }, 8, ["name", "description"])) : !$setup.wizardStore.customTemplate ? (openBlock(), createElementBlock("div", _hoisted_12$8, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.templates, (template) => {
          return openBlock(), createElementBlock("div", {
            key: template.name,
            class: normalizeClass(["template-card", { selected: $setup.wizardStore.selectedTemplate?.name === template.name }]),
            onClick: ($event) => $setup.selectTemplate(template)
          }, [
            createBaseVNode("div", _hoisted_14$8, [
              createBaseVNode(
                "h3",
                _hoisted_15$7,
                toDisplayString(template.name),
                1
                /* TEXT */
              ),
              createBaseVNode(
                "span",
                _hoisted_16$7,
                "v" + toDisplayString(template.version),
                1
                /* TEXT */
              )
            ]),
            createBaseVNode(
              "p",
              _hoisted_17$7,
              toDisplayString(template.description),
              1
              /* TEXT */
            ),
            createBaseVNode("div", _hoisted_18$6, [
              createBaseVNode("div", _hoisted_19$6, [
                createBaseVNode(
                  "span",
                  _hoisted_20$6,
                  toDisplayString($setup.t("agora", "Author:")),
                  1
                  /* TEXT */
                ),
                createBaseVNode(
                  "span",
                  _hoisted_21$6,
                  toDisplayString(template.author),
                  1
                  /* TEXT */
                )
              ]),
              createBaseVNode("div", _hoisted_22$4, [
                createBaseVNode(
                  "span",
                  _hoisted_23$4,
                  toDisplayString($setup.t("agora", "Languages:")),
                  1
                  /* TEXT */
                ),
                createBaseVNode(
                  "span",
                  _hoisted_24$4,
                  toDisplayString(template.available_languages.join(", ")),
                  1
                  /* TEXT */
                )
              ])
            ]),
            createBaseVNode("div", _hoisted_25$4, [
              createBaseVNode("div", _hoisted_26$2, [
                createBaseVNode(
                  "span",
                  _hoisted_27$2,
                  toDisplayString(template.counts.inquiry_families),
                  1
                  /* TEXT */
                ),
                createBaseVNode(
                  "span",
                  _hoisted_28$2,
                  toDisplayString($setup.t("agora", "Families")),
                  1
                  /* TEXT */
                )
              ]),
              createBaseVNode("div", _hoisted_29$2, [
                createBaseVNode(
                  "span",
                  _hoisted_30$2,
                  toDisplayString(template.counts.inquiry_types),
                  1
                  /* TEXT */
                ),
                createBaseVNode(
                  "span",
                  _hoisted_31$2,
                  toDisplayString($setup.t("agora", "Types")),
                  1
                  /* TEXT */
                )
              ]),
              createBaseVNode("div", _hoisted_32$2, [
                createBaseVNode(
                  "span",
                  _hoisted_33$2,
                  toDisplayString(template.counts.inquiry_statuses),
                  1
                  /* TEXT */
                ),
                createBaseVNode(
                  "span",
                  _hoisted_34$2,
                  toDisplayString($setup.t("agora", "Statuses")),
                  1
                  /* TEXT */
                )
              ]),
              createBaseVNode("div", _hoisted_35$2, [
                createBaseVNode(
                  "span",
                  _hoisted_36$1,
                  toDisplayString(template.counts.categories),
                  1
                  /* TEXT */
                ),
                createBaseVNode(
                  "span",
                  _hoisted_37$1,
                  toDisplayString($setup.t("agora", "Categories")),
                  1
                  /* TEXT */
                )
              ])
            ]),
            $setup.wizardStore.selectedTemplate?.name === template.name ? (openBlock(), createElementBlock("div", _hoisted_38$1, [
              _cache[8] || (_cache[8] = createBaseVNode(
                "span",
                { class: "check-icon" },
                "✓",
                -1
                /* CACHED */
              )),
              createTextVNode(
                " " + toDisplayString($setup.t("agora", "Selected")),
                1
                /* TEXT */
              )
            ])) : createCommentVNode("v-if", true)
          ], 10, _hoisted_13$8);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ])) : createCommentVNode("v-if", true)
  ]);
}
const StepTemplateSelection = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y], ["__scopeId", "data-v-4e395d60"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/steps/StepTemplateSelection.vue"]]);
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "StepLanguageSelection",
  setup(__props, { expose: __expose }) {
    __expose();
    const wizardStore = useTemplateWizardStore();
    const availableLanguages = computed(() => wizardStore.availableLanguages);
    const languageNames = {
      en: translate("agora", "English"),
      fr: translate("agora", "French"),
      de: translate("agora", "German"),
      gsw: translate("agora", "Swiss German"),
      it: translate("agora", "Italian"),
      es: translate("agora", "Spanish"),
      pt: translate("agora", "Portuguese"),
      nl: translate("agora", "Dutch")
    };
    const getLanguageName = (code) => {
      return languageNames[code] || code.toUpperCase();
    };
    const selectLanguage = (language) => {
      wizardStore.selectLanguage(language);
    };
    const __returned__ = { wizardStore, availableLanguages, languageNames, getLanguageName, selectLanguage, get t() {
      return translate;
    }, get NcNoteCard() {
      return NcNoteCard;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$x = { class: "language-selection" };
const _hoisted_2$p = { class: "language-header" };
const _hoisted_3$j = { class: "subtitle" };
const _hoisted_4$h = { class: "language-grid" };
const _hoisted_5$d = ["onClick"];
const _hoisted_6$d = { class: "language-flag" };
const _hoisted_7$c = { class: "language-name" };
const _hoisted_8$c = {
  key: 0,
  class: "selected-check"
};
const _hoisted_9$b = {
  key: 0,
  class: "selection-summary"
};
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$x, [
    createBaseVNode("div", _hoisted_2$p, [
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Choose Your Language")),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        _hoisted_3$j,
        toDisplayString($setup.t("agora", "Select the language for your template content")),
        1
        /* TEXT */
      )
    ]),
    createVNode($setup["NcNoteCard"], {
      type: "info",
      class: "language-note"
    }, {
      default: withCtx(() => [
        createBaseVNode(
          "p",
          null,
          toDisplayString($setup.t("agora", "Only the selected language will be imported into the database. The template contains embedded translations, but you must choose which language to use for your instance.")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }),
    createBaseVNode("div", _hoisted_4$h, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.availableLanguages, (lang) => {
          return openBlock(), createElementBlock("div", {
            key: lang,
            class: normalizeClass(["language-card", { selected: $setup.wizardStore.selectedLanguage === lang }]),
            onClick: ($event) => $setup.selectLanguage(lang)
          }, [
            createBaseVNode(
              "div",
              _hoisted_6$d,
              toDisplayString(lang.toUpperCase()),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "div",
              _hoisted_7$c,
              toDisplayString($setup.getLanguageName(lang)),
              1
              /* TEXT */
            ),
            $setup.wizardStore.selectedLanguage === lang ? (openBlock(), createElementBlock("div", _hoisted_8$c, " ✓ ")) : createCommentVNode("v-if", true)
          ], 10, _hoisted_5$d);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]),
    $setup.wizardStore.selectedLanguage ? (openBlock(), createElementBlock("div", _hoisted_9$b, [
      createBaseVNode(
        "strong",
        null,
        toDisplayString($setup.t("agora", "Selected:")),
        1
        /* TEXT */
      ),
      createTextVNode(
        " " + toDisplayString($setup.getLanguageName($setup.wizardStore.selectedLanguage)),
        1
        /* TEXT */
      )
    ])) : createCommentVNode("v-if", true)
  ]);
}
const StepLanguageSelection = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x], ["__scopeId", "data-v-e6e1081e"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/steps/StepLanguageSelection.vue"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "StepPreview",
  setup(__props, { expose: __expose }) {
    __expose();
    const wizardStore = useTemplateWizardStore();
    const editableData = computed(() => wizardStore.editableData);
    const duplicateAnalysis = ref(null);
    const isAnalyzing = ref(false);
    const analysisError = ref(null);
    const expandedSections = ref({
      inquiry_families: true,
      inquiry_types: false,
      inquiry_statuses: false,
      option_types: false,
      inquiry_group_types: false,
      categories: false,
      locations: false
    });
    const editingItem = ref(null);
    const editingItemData = ref(null);
    const sections = computed(() => {
      if (!editableData.value) return [];
      return [
        {
          key: "inquiry_families",
          label: translate("agora", "Inquiry Families"),
          icon: "📁",
          count: editableData.value.inquiry_families?.length || 0,
          itemLabelKey: "label",
          itemTypeKey: "family_type"
        },
        {
          key: "inquiry_types",
          label: translate("agora", "Inquiry Types"),
          icon: "📋",
          count: editableData.value.inquiry_types?.length || 0,
          itemLabelKey: "label",
          itemTypeKey: "inquiry_type"
        },
        {
          key: "inquiry_statuses",
          label: translate("agora", "Inquiry Statuses"),
          icon: "📊",
          count: editableData.value.inquiry_statuses?.length || 0,
          itemLabelKey: "label",
          itemTypeKey: "status_key"
        },
        {
          key: "option_types",
          label: translate("agora", "Option Types"),
          icon: "🎯",
          count: editableData.value.option_types?.length || 0,
          itemLabelKey: "label",
          itemTypeKey: "option_type"
        },
        {
          key: "inquiry_group_types",
          label: translate("agora", "Inquiry Group Types"),
          icon: "👥",
          count: editableData.value.inquiry_group_types?.length || 0,
          itemLabelKey: "label",
          itemTypeKey: "group_type"
        },
        {
          key: "categories",
          label: translate("agora", "Categories"),
          icon: "🏷️",
          count: editableData.value.categories?.length || 0,
          itemLabelKey: "name",
          itemTypeKey: "category_id"
        },
        {
          key: "locations",
          label: translate("agora", "Locations"),
          icon: "📍",
          count: editableData.value.locations?.length || 0,
          itemLabelKey: "name",
          itemTypeKey: "location_id"
        }
      ].filter((section) => section.count > 0);
    });
    const toggleSection = (key) => {
      expandedSections.value[key] = !expandedSections.value[key];
    };
    const startEdit = (section, index) => {
      const item = editableData.value?.[section]?.[index];
      if (item) {
        editingItem.value = { section, index };
        editingItemData.value = JSON.parse(JSON.stringify(item));
      }
    };
    const cancelEdit = () => {
      editingItem.value = null;
      editingItemData.value = null;
    };
    const saveEdit = () => {
      if (editingItem.value && editingItemData.value) {
        wizardStore.updateEditableItem(
          editingItem.value.section,
          editingItem.value.index,
          editingItemData.value
        );
        editingItem.value = null;
        editingItemData.value = null;
      }
    };
    const removeItem = (section, index) => {
      if (confirm(translate("agora", "Are you sure you want to remove this item?"))) {
        wizardStore.removeEditableItem(section, index);
      }
    };
    const isEditing = (section, index) => {
      return editingItem.value?.section === section && editingItem.value?.index === index;
    };
    const getEditableLabelValue = (section) => {
      if (!editingItemData.value) {
        console.warn("[TemplateWizard] getEditableLabelValue: editingItemData is null");
        return "";
      }
      const labelKey = section.itemLabelKey;
      const labelValue = editingItemData.value[labelKey];
      console.log("[TemplateWizard] getEditableLabelValue:", {
        labelKey,
        labelValue,
        typeofLabel: typeof labelValue,
        editingItemData: editingItemData.value
      });
      if (labelValue === null || labelValue === void 0) {
        console.warn("[TemplateWizard] Label value is null/undefined for key:", labelKey);
        return "";
      }
      if (typeof labelValue === "object" && !Array.isArray(labelValue)) {
        const lang = wizardStore.selectedLanguage || "en";
        const extracted = labelValue[lang] || labelValue.en || Object.values(labelValue).find((v) => typeof v === "string" && v !== "") || "";
        console.log("[TemplateWizard] Extracted from multi-lang object:", extracted);
        return String(extracted);
      }
      return String(labelValue);
    };
    const setEditableLabelValue = (section, newValue) => {
      if (!editingItemData.value) return;
      const labelKey = section.itemLabelKey;
      console.log("[TemplateWizard] setEditableLabelValue:", { labelKey, newValue });
      editingItemData.value[labelKey] = newValue;
    };
    const getItemLabel = (item, section) => {
      const labelValue = item[section.itemLabelKey];
      if (labelValue && typeof labelValue === "object" && !Array.isArray(labelValue)) {
        const lang = wizardStore.selectedLanguage || "en";
        return labelValue[lang] || labelValue.en || labelValue[Object.keys(labelValue)[0]] || item[section.itemTypeKey] || translate("agora", "Unnamed");
      }
      return labelValue || item[section.itemTypeKey] || translate("agora", "Unnamed");
    };
    const getItemType = (item, section) => {
      return item[section.itemTypeKey] || "";
    };
    const totalItems = computed(() => {
      if (!editableData.value) return 0;
      return sections.value.reduce((sum, section) => sum + section.count, 0);
    });
    onMounted(async () => {
      await analyzeDuplicates();
    });
    const analyzeDuplicates = async () => {
      if (!editableData.value) return;
      isAnalyzing.value = true;
      analysisError.value = null;
      try {
        const url = generateOcsUrl("/apps/agora/api/v1.0/templates/analyze");
        const response = await cancelableClient.post(url, {
          templateData: editableData.value,
          language: wizardStore.selectedLanguage
        });
        if (response.data?.ocs?.data) {
          duplicateAnalysis.value = response.data.ocs.data;
        }
      } catch (error) {
        console.error("Failed to analyze template:", error);
        analysisError.value = error instanceof Error ? error.message : "Failed to analyze template";
      } finally {
        isAnalyzing.value = false;
      }
    };
    const getSectionStatus = (sectionKey) => {
      if (!duplicateAnalysis.value?.analysis?.[sectionKey]) {
        return { new: 0, existing: 0, total: 0 };
      }
      const data = duplicateAnalysis.value.analysis[sectionKey];
      const newCount = data.new?.length || 0;
      const existingCount = data.existing?.length || 0;
      return {
        new: newCount,
        existing: existingCount,
        total: newCount + existingCount
      };
    };
    const getItemStatus = (sectionKey, itemType) => {
      if (!duplicateAnalysis.value?.analysis?.[sectionKey]) return "unknown";
      if (!itemType) return "unknown";
      const data = duplicateAnalysis.value.analysis[sectionKey];
      const matchItem = (item) => {
        return item.type === itemType || item.identifier === itemType || item.key === itemType || item.id === itemType;
      };
      const isNew = data.new?.some(matchItem);
      const isExisting = data.existing?.some(matchItem);
      console.log(`[getItemStatus] ${sectionKey}/${itemType}: new=${isNew}, existing=${isExisting}`, {
        newItems: data.new?.map((i) => i.type || i.identifier || i.key),
        existingItems: data.existing?.map((i) => i.type || i.identifier || i.key)
      });
      if (isNew) return "new";
      if (isExisting) return "existing";
      return "unknown";
    };
    watch(() => editableData.value, () => {
      if (editableData.value) {
        if (sections.value.length > 0) {
          expandedSections.value[sections.value[0].key] = true;
        }
        analyzeDuplicates();
      }
    });
    const __returned__ = { wizardStore, editableData, duplicateAnalysis, isAnalyzing, analysisError, expandedSections, editingItem, editingItemData, sections, toggleSection, startEdit, cancelEdit, saveEdit, removeItem, isEditing, getEditableLabelValue, setEditableLabelValue, getItemLabel, getItemType, totalItems, analyzeDuplicates, getSectionStatus, getItemStatus, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get NcTextField() {
      return _sfc_main$A;
    }, get NcTextArea() {
      return NcTextArea;
    }, get NcNoteCard() {
      return NcNoteCard;
    }, get NcLoadingIcon() {
      return NcLoadingIcon;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$w = { class: "preview-step" };
const _hoisted_2$o = { class: "preview-header" };
const _hoisted_3$i = { class: "subtitle" };
const _hoisted_4$g = {
  key: 0,
  class: "loading-state"
};
const _hoisted_5$c = {
  key: 1,
  class: "preview-content"
};
const _hoisted_6$c = {
  key: 0,
  class: "analysis-loading"
};
const _hoisted_7$b = { class: "summary-card" };
const _hoisted_8$b = {
  key: 0,
  class: "summary-stats"
};
const _hoisted_9$a = { class: "stat-item" };
const _hoisted_10$8 = { class: "stat-value stat-new" };
const _hoisted_11$8 = { class: "stat-label" };
const _hoisted_12$7 = { class: "stat-item" };
const _hoisted_13$7 = { class: "stat-value stat-existing" };
const _hoisted_14$7 = { class: "stat-label" };
const _hoisted_15$6 = { class: "stat-item" };
const _hoisted_16$6 = { class: "stat-value" };
const _hoisted_17$6 = { class: "stat-label" };
const _hoisted_18$5 = { class: "stat-item" };
const _hoisted_19$5 = { class: "stat-value" };
const _hoisted_20$5 = { class: "stat-label" };
const _hoisted_21$5 = {
  key: 1,
  class: "summary-stats"
};
const _hoisted_22$3 = { class: "stat-item" };
const _hoisted_23$3 = { class: "stat-value" };
const _hoisted_24$3 = { class: "stat-label" };
const _hoisted_25$3 = { class: "stat-item" };
const _hoisted_26$1 = { class: "stat-value" };
const _hoisted_27$1 = { class: "stat-label" };
const _hoisted_28$1 = { class: "sections-container" };
const _hoisted_29$1 = ["onClick"];
const _hoisted_30$1 = { class: "section-title" };
const _hoisted_31$1 = { class: "section-icon" };
const _hoisted_32$1 = { class: "section-count" };
const _hoisted_33$1 = {
  key: 0,
  class: "section-status"
};
const _hoisted_34$1 = {
  key: 0,
  class: "status-badge status-new"
};
const _hoisted_35$1 = {
  key: 1,
  class: "status-badge status-existing"
};
const _hoisted_36 = { class: "expand-icon" };
const _hoisted_37 = {
  key: 0,
  class: "section-content"
};
const _hoisted_38 = {
  key: 0,
  class: "item-view"
};
const _hoisted_39 = { class: "item-info" };
const _hoisted_40 = { class: "item-header-row" };
const _hoisted_41 = { class: "item-label" };
const _hoisted_42 = { class: "item-type" };
const _hoisted_43 = {
  key: 0,
  class: "item-description"
};
const _hoisted_44 = { class: "item-actions" };
const _hoisted_45 = { class: "item-edit" };
const _hoisted_46 = { class: "edit-form" };
const _hoisted_47 = { class: "edit-actions" };
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$w, [
    createBaseVNode("div", _hoisted_2$o, [
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Preview & Customize Template")),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        _hoisted_3$i,
        toDisplayString($setup.t("agora", "Review and customize the template before import")),
        1
        /* TEXT */
      )
    ]),
    !$setup.editableData ? (openBlock(), createElementBlock("div", _hoisted_4$g, [
      createBaseVNode(
        "p",
        null,
        toDisplayString($setup.t("agora", "Preparing template data...")),
        1
        /* TEXT */
      )
    ])) : (openBlock(), createElementBlock("div", _hoisted_5$c, [
      createCommentVNode(" Duplicate Analysis Loading "),
      $setup.isAnalyzing ? (openBlock(), createElementBlock("div", _hoisted_6$c, [
        createVNode($setup["NcLoadingIcon"], { size: 32 }),
        createBaseVNode(
          "p",
          null,
          toDisplayString($setup.t("agora", "Analyzing template for duplicates...")),
          1
          /* TEXT */
        )
      ])) : createCommentVNode("v-if", true),
      createCommentVNode(" Analysis Error "),
      $setup.analysisError ? (openBlock(), createBlock($setup["NcNoteCard"], {
        key: 1,
        type: "error",
        class: "analysis-error"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Failed to analyze template:")) + " " + toDisplayString($setup.analysisError),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createCommentVNode(" Summary Card with Duplicate Analysis "),
      createBaseVNode("div", _hoisted_7$b, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.t("agora", "Import Preview")),
          1
          /* TEXT */
        ),
        $setup.duplicateAnalysis ? (openBlock(), createElementBlock("div", _hoisted_8$b, [
          createBaseVNode("div", _hoisted_9$a, [
            _cache[1] || (_cache[1] = createBaseVNode(
              "span",
              { class: "stat-icon" },
              "✨",
              -1
              /* CACHED */
            )),
            createBaseVNode(
              "span",
              _hoisted_10$8,
              toDisplayString($setup.duplicateAnalysis.totals.new),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "span",
              _hoisted_11$8,
              toDisplayString($setup.t("agora", "New Items")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_12$7, [
            _cache[2] || (_cache[2] = createBaseVNode(
              "span",
              { class: "stat-icon" },
              "📋",
              -1
              /* CACHED */
            )),
            createBaseVNode(
              "span",
              _hoisted_13$7,
              toDisplayString($setup.duplicateAnalysis.totals.existing),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "span",
              _hoisted_14$7,
              toDisplayString($setup.t("agora", "Existing (Skipped)")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_15$6, [
            _cache[3] || (_cache[3] = createBaseVNode(
              "span",
              { class: "stat-icon" },
              "📦",
              -1
              /* CACHED */
            )),
            createBaseVNode(
              "span",
              _hoisted_16$6,
              toDisplayString($setup.totalItems),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "span",
              _hoisted_17$6,
              toDisplayString($setup.t("agora", "Total Items")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_18$5, [
            _cache[4] || (_cache[4] = createBaseVNode(
              "span",
              { class: "stat-icon" },
              "🌐",
              -1
              /* CACHED */
            )),
            createBaseVNode(
              "span",
              _hoisted_19$5,
              toDisplayString($setup.wizardStore.selectedLanguage),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "span",
              _hoisted_20$5,
              toDisplayString($setup.t("agora", "Language")),
              1
              /* TEXT */
            )
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_21$5, [
          createBaseVNode("div", _hoisted_22$3, [
            _cache[5] || (_cache[5] = createBaseVNode(
              "span",
              { class: "stat-icon" },
              "📦",
              -1
              /* CACHED */
            )),
            createBaseVNode(
              "span",
              _hoisted_23$3,
              toDisplayString($setup.totalItems),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "span",
              _hoisted_24$3,
              toDisplayString($setup.t("agora", "Total Items")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_25$3, [
            _cache[6] || (_cache[6] = createBaseVNode(
              "span",
              { class: "stat-icon" },
              "🌐",
              -1
              /* CACHED */
            )),
            createBaseVNode(
              "span",
              _hoisted_26$1,
              toDisplayString($setup.wizardStore.selectedLanguage),
              1
              /* TEXT */
            ),
            createBaseVNode(
              "span",
              _hoisted_27$1,
              toDisplayString($setup.t("agora", "Language")),
              1
              /* TEXT */
            )
          ])
        ]))
      ]),
      createCommentVNode(" Important Note "),
      $setup.duplicateAnalysis && $setup.duplicateAnalysis.totals.existing > 0 ? (openBlock(), createBlock($setup["NcNoteCard"], {
        key: 2,
        type: "info",
        class: "duplicate-notice"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "{count} item(s) already exist in the database and will be skipped during import.", { count: $setup.duplicateAnalysis.totals.existing })),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createCommentVNode(" Sections "),
      createBaseVNode("div", _hoisted_28$1, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList($setup.sections, (section) => {
            return openBlock(), createElementBlock("div", {
              key: section.key,
              class: "section-block"
            }, [
              createBaseVNode("div", {
                class: "section-header",
                onClick: ($event) => $setup.toggleSection(section.key)
              }, [
                createBaseVNode("div", _hoisted_30$1, [
                  createBaseVNode(
                    "span",
                    _hoisted_31$1,
                    toDisplayString(section.icon),
                    1
                    /* TEXT */
                  ),
                  createBaseVNode(
                    "h3",
                    null,
                    toDisplayString(section.label),
                    1
                    /* TEXT */
                  ),
                  createBaseVNode(
                    "span",
                    _hoisted_32$1,
                    "(" + toDisplayString(section.count) + ")",
                    1
                    /* TEXT */
                  ),
                  $setup.duplicateAnalysis ? (openBlock(), createElementBlock("span", _hoisted_33$1, [
                    $setup.getSectionStatus(section.key).new > 0 ? (openBlock(), createElementBlock(
                      "span",
                      _hoisted_34$1,
                      toDisplayString($setup.getSectionStatus(section.key).new) + " new ",
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    $setup.getSectionStatus(section.key).existing > 0 ? (openBlock(), createElementBlock(
                      "span",
                      _hoisted_35$1,
                      toDisplayString($setup.getSectionStatus(section.key).existing) + " exist ",
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ])) : createCommentVNode("v-if", true)
                ]),
                createBaseVNode(
                  "span",
                  _hoisted_36,
                  toDisplayString($setup.expandedSections[section.key] ? "▼" : "▶"),
                  1
                  /* TEXT */
                )
              ], 8, _hoisted_29$1),
              $setup.expandedSections[section.key] ? (openBlock(), createElementBlock("div", _hoisted_37, [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList($setup.editableData[section.key], (item, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: "item-row"
                    }, [
                      createCommentVNode(" View Mode "),
                      !$setup.isEditing(section.key, index) ? (openBlock(), createElementBlock("div", _hoisted_38, [
                        createBaseVNode("div", _hoisted_39, [
                          createBaseVNode("div", _hoisted_40, [
                            createBaseVNode(
                              "div",
                              _hoisted_41,
                              toDisplayString($setup.getItemLabel(item, section)),
                              1
                              /* TEXT */
                            ),
                            $setup.duplicateAnalysis && $setup.getItemStatus(section.key, $setup.getItemType(item, section)) !== "unknown" ? (openBlock(), createElementBlock(
                              "span",
                              {
                                key: 0,
                                class: normalizeClass(["item-status-badge", {
                                  "badge-new": $setup.getItemStatus(section.key, $setup.getItemType(item, section)) === "new",
                                  "badge-existing": $setup.getItemStatus(section.key, $setup.getItemType(item, section)) === "existing"
                                }])
                              },
                              toDisplayString($setup.getItemStatus(section.key, $setup.getItemType(item, section)) === "new" ? "✨ New" : "📋 Exists"),
                              3
                              /* TEXT, CLASS */
                            )) : createCommentVNode("v-if", true)
                          ]),
                          createBaseVNode(
                            "div",
                            _hoisted_42,
                            toDisplayString($setup.getItemType(item, section)),
                            1
                            /* TEXT */
                          ),
                          item.description ? (openBlock(), createElementBlock(
                            "div",
                            _hoisted_43,
                            toDisplayString(item.description),
                            1
                            /* TEXT */
                          )) : createCommentVNode("v-if", true)
                        ]),
                        createBaseVNode("div", _hoisted_44, [
                          createVNode($setup["NcButton"], {
                            type: "tertiary",
                            onClick: ($event) => $setup.startEdit(section.key, index)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString($setup.t("agora", "Edit")),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["onClick"]),
                          createVNode($setup["NcButton"], {
                            type: "error",
                            onClick: ($event) => $setup.removeItem(section.key, index)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString($setup.t("agora", "Remove")),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["onClick"])
                        ])
                      ])) : (openBlock(), createElementBlock(
                        Fragment,
                        { key: 1 },
                        [
                          createCommentVNode(" Edit Mode "),
                          createBaseVNode("div", _hoisted_45, [
                            createBaseVNode("div", _hoisted_46, [
                              createVNode($setup["NcTextField"], {
                                modelValue: $setup.editingItemData[section.itemTypeKey],
                                "onUpdate:modelValue": ($event) => $setup.editingItemData[section.itemTypeKey] = $event,
                                label: $setup.t("agora", "Type Key"),
                                placeholder: $setup.t("agora", "Change to avoid duplicates"),
                                class: "edit-field"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "placeholder"]),
                              createVNode($setup["NcTextField"], {
                                "model-value": $setup.getEditableLabelValue(section),
                                "onUpdate:modelValue": ($event) => $setup.setEditableLabelValue(section, $event),
                                label: $setup.t("agora", "Label"),
                                class: "edit-field"
                              }, null, 8, ["model-value", "onUpdate:modelValue", "label"]),
                              $setup.editingItemData.description !== void 0 ? (openBlock(), createBlock($setup["NcTextArea"], {
                                key: 0,
                                modelValue: $setup.editingItemData.description,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.editingItemData.description = $event),
                                label: $setup.t("agora", "Description"),
                                class: "edit-field"
                              }, null, 8, ["modelValue", "label"])) : createCommentVNode("v-if", true)
                            ]),
                            createBaseVNode("div", _hoisted_47, [
                              createVNode($setup["NcButton"], {
                                type: "primary",
                                onClick: $setup.saveEdit
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString($setup.t("agora", "Save")),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 1
                                /* STABLE */
                              }),
                              createVNode($setup["NcButton"], {
                                type: "tertiary",
                                onClick: $setup.cancelEdit
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
                              })
                            ])
                          ])
                        ],
                        2112
                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                      ))
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : createCommentVNode("v-if", true)
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]))
  ]);
}
const StepPreview = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w], ["__scopeId", "data-v-1aff519f"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/steps/StepPreview.vue"]]);
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "StepSummary",
  setup(__props, { expose: __expose }) {
    __expose();
    const wizardStore = useTemplateWizardStore();
    const template = computed(() => wizardStore.selectedTemplate);
    const language = computed(() => wizardStore.selectedLanguage);
    const editableData = computed(() => wizardStore.editableData);
    const counts = computed(() => ({
      inquiry_families: editableData.value?.inquiry_families?.length || 0,
      inquiry_types: editableData.value?.inquiry_types?.length || 0,
      inquiry_statuses: editableData.value?.inquiry_statuses?.length || 0,
      option_types: editableData.value?.option_types?.length || 0,
      inquiry_group_types: editableData.value?.inquiry_group_types?.length || 0,
      categories: editableData.value?.categories?.length || 0,
      locations: editableData.value?.locations?.length || 0
    }));
    const totalItems = computed(() => {
      return counts.value.inquiry_families + counts.value.inquiry_types + counts.value.inquiry_statuses + counts.value.option_types + counts.value.inquiry_group_types + counts.value.categories + counts.value.locations;
    });
    const __returned__ = { wizardStore, template, language, editableData, counts, totalItems, get t() {
      return translate;
    }, get NcNoteCard() {
      return NcNoteCard;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$v = { class: "summary-step" };
const _hoisted_2$n = { class: "summary-header" };
const _hoisted_3$h = { class: "subtitle" };
const _hoisted_4$f = {
  key: 0,
  class: "summary-content"
};
const _hoisted_5$b = { class: "summary-box" };
const _hoisted_6$b = { class: "summary-item" };
const _hoisted_7$a = { class: "label" };
const _hoisted_8$a = { class: "value" };
const _hoisted_9$9 = { class: "summary-item" };
const _hoisted_10$7 = { class: "label" };
const _hoisted_11$7 = { class: "value" };
const _hoisted_12$6 = { class: "summary-item" };
const _hoisted_13$6 = { class: "label" };
const _hoisted_14$6 = { class: "value" };
const _hoisted_15$5 = { class: "summary-item" };
const _hoisted_16$5 = { class: "label" };
const _hoisted_17$5 = { class: "value" };
const _hoisted_18$4 = { class: "summary-item" };
const _hoisted_19$4 = { class: "label" };
const _hoisted_20$4 = { class: "value" };
const _hoisted_21$4 = {
  key: 0,
  class: "summary-item"
};
const _hoisted_22$2 = { class: "label" };
const _hoisted_23$2 = { class: "value" };
const _hoisted_24$2 = {
  key: 1,
  class: "summary-item"
};
const _hoisted_25$2 = { class: "label" };
const _hoisted_26 = { class: "value" };
const _hoisted_27 = { class: "summary-item" };
const _hoisted_28 = { class: "label" };
const _hoisted_29 = { class: "value" };
const _hoisted_30 = {
  key: 2,
  class: "summary-item"
};
const _hoisted_31 = { class: "label" };
const _hoisted_32 = { class: "value" };
const _hoisted_33 = { class: "summary-total" };
const _hoisted_34 = { class: "label" };
const _hoisted_35 = { class: "value" };
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$v, [
    createBaseVNode("div", _hoisted_2$n, [
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Review & Confirm")),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        _hoisted_3$h,
        toDisplayString($setup.t("agora", "Please review your selections before importing")),
        1
        /* TEXT */
      )
    ]),
    createVNode($setup["NcNoteCard"], {
      type: "warning",
      class: "warning-note"
    }, {
      default: withCtx(() => [
        createBaseVNode(
          "p",
          null,
          toDisplayString($setup.t("agora", "This will create new configuration data in your database. If you want to replace existing data, run the cleanup command first.")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }),
    $setup.template ? (openBlock(), createElementBlock("div", _hoisted_4$f, [
      createBaseVNode("div", _hoisted_5$b, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.t("agora", "Import Summary")),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_6$b, [
          createBaseVNode(
            "span",
            _hoisted_7$a,
            toDisplayString($setup.t("agora", "Template:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_8$a,
            toDisplayString($setup.template.name) + " (v" + toDisplayString($setup.template.version) + ")",
            1
            /* TEXT */
          )
        ]),
        createBaseVNode("div", _hoisted_9$9, [
          createBaseVNode(
            "span",
            _hoisted_10$7,
            toDisplayString($setup.t("agora", "Language:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_11$7,
            toDisplayString($setup.language),
            1
            /* TEXT */
          )
        ]),
        _cache[0] || (_cache[0] = createBaseVNode(
          "div",
          { class: "summary-divider" },
          null,
          -1
          /* CACHED */
        )),
        createBaseVNode("div", _hoisted_12$6, [
          createBaseVNode(
            "span",
            _hoisted_13$6,
            toDisplayString($setup.t("agora", "Families:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_14$6,
            toDisplayString($setup.counts.inquiry_families) + " " + toDisplayString($setup.t("agora", "items")),
            1
            /* TEXT */
          )
        ]),
        createBaseVNode("div", _hoisted_15$5, [
          createBaseVNode(
            "span",
            _hoisted_16$5,
            toDisplayString($setup.t("agora", "Inquiry Types:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_17$5,
            toDisplayString($setup.counts.inquiry_types) + " " + toDisplayString($setup.t("agora", "items")),
            1
            /* TEXT */
          )
        ]),
        createBaseVNode("div", _hoisted_18$4, [
          createBaseVNode(
            "span",
            _hoisted_19$4,
            toDisplayString($setup.t("agora", "Statuses:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_20$4,
            toDisplayString($setup.counts.inquiry_statuses) + " " + toDisplayString($setup.t("agora", "items")),
            1
            /* TEXT */
          )
        ]),
        $setup.counts.option_types > 0 ? (openBlock(), createElementBlock("div", _hoisted_21$4, [
          createBaseVNode(
            "span",
            _hoisted_22$2,
            toDisplayString($setup.t("agora", "Option Types:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_23$2,
            toDisplayString($setup.counts.option_types) + " " + toDisplayString($setup.t("agora", "items")),
            1
            /* TEXT */
          )
        ])) : createCommentVNode("v-if", true),
        $setup.counts.inquiry_group_types > 0 ? (openBlock(), createElementBlock("div", _hoisted_24$2, [
          createBaseVNode(
            "span",
            _hoisted_25$2,
            toDisplayString($setup.t("agora", "Group Types:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_26,
            toDisplayString($setup.counts.inquiry_group_types) + " " + toDisplayString($setup.t("agora", "items")),
            1
            /* TEXT */
          )
        ])) : createCommentVNode("v-if", true),
        createBaseVNode("div", _hoisted_27, [
          createBaseVNode(
            "span",
            _hoisted_28,
            toDisplayString($setup.t("agora", "Categories:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_29,
            toDisplayString($setup.counts.categories) + " " + toDisplayString($setup.t("agora", "items")),
            1
            /* TEXT */
          )
        ]),
        $setup.counts.locations > 0 ? (openBlock(), createElementBlock("div", _hoisted_30, [
          createBaseVNode(
            "span",
            _hoisted_31,
            toDisplayString($setup.t("agora", "Locations:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_32,
            toDisplayString($setup.counts.locations) + " " + toDisplayString($setup.t("agora", "items")),
            1
            /* TEXT */
          )
        ])) : createCommentVNode("v-if", true),
        _cache[1] || (_cache[1] = createBaseVNode(
          "div",
          { class: "summary-divider" },
          null,
          -1
          /* CACHED */
        )),
        createBaseVNode("div", _hoisted_33, [
          createBaseVNode(
            "span",
            _hoisted_34,
            toDisplayString($setup.t("agora", "Total Items:")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "span",
            _hoisted_35,
            toDisplayString($setup.totalItems),
            1
            /* TEXT */
          )
        ])
      ])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const StepSummary = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-13b1c365"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/steps/StepSummary.vue"]]);
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "StepImporting",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get t() {
      return translate;
    }, get NcLoadingIcon() {
      return NcLoadingIcon;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$u = { class: "importing-step" };
const _hoisted_2$m = { class: "importing-content" };
const _hoisted_3$g = { class: "importing-message" };
const _hoisted_4$e = { class: "importing-submessage" };
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$u, [
    createBaseVNode("div", _hoisted_2$m, [
      createVNode($setup["NcLoadingIcon"], { size: 80 }),
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Importing Template")),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        _hoisted_3$g,
        toDisplayString($setup.t("agora", "Please wait while the template is being imported...")),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        _hoisted_4$e,
        toDisplayString($setup.t("agora", "This may take a few moments depending on the template size.")),
        1
        /* TEXT */
      )
    ])
  ]);
}
const StepImporting = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-38620be8"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/steps/StepImporting.vue"]]);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "StepResults",
  setup(__props, { expose: __expose }) {
    __expose();
    const wizardStore = useTemplateWizardStore();
    const importResult = computed(() => wizardStore.importResult);
    const hasErrors = computed(() => importResult.value?.failed.length > 0);
    const hasSuccess = computed(() => importResult.value?.success.length > 0);
    const hasSkipped = computed(() => importResult.value?.skipped.length > 0);
    const goToAgora = () => {
      window.location.href = "/apps/agora";
    };
    const goToSettings = () => {
      window.location.reload();
    };
    const closeWizard = () => {
      wizardStore.closeWizard();
    };
    const __returned__ = { wizardStore, importResult, hasErrors, hasSuccess, hasSkipped, goToAgora, goToSettings, closeWizard, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$t = { class: "results-step" };
const _hoisted_2$l = { class: "results-header" };
const _hoisted_3$f = {
  key: 0,
  class: "success-icon"
};
const _hoisted_4$d = {
  key: 1,
  class: "warning-icon"
};
const _hoisted_5$a = { key: 2 };
const _hoisted_6$a = { key: 3 };
const _hoisted_7$9 = {
  key: 0,
  class: "results-content"
};
const _hoisted_8$9 = {
  key: 0,
  class: "result-section success-section"
};
const _hoisted_9$8 = { class: "result-list" };
const _hoisted_10$6 = {
  key: 1,
  class: "result-section skipped-section"
};
const _hoisted_11$6 = { class: "result-list" };
const _hoisted_12$5 = {
  key: 2,
  class: "result-section error-section"
};
const _hoisted_13$5 = { class: "result-list" };
const _hoisted_14$5 = { class: "results-actions" };
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$t, [
    createBaseVNode("div", _hoisted_2$l, [
      !$setup.hasErrors ? (openBlock(), createElementBlock("div", _hoisted_3$f, "✓")) : (openBlock(), createElementBlock("div", _hoisted_4$d, "⚠")),
      !$setup.hasErrors ? (openBlock(), createElementBlock(
        "h2",
        _hoisted_5$a,
        toDisplayString($setup.t("agora", "Import Complete!")),
        1
        /* TEXT */
      )) : (openBlock(), createElementBlock(
        "h2",
        _hoisted_6$a,
        toDisplayString($setup.t("agora", "Import Completed with Warnings")),
        1
        /* TEXT */
      ))
    ]),
    $setup.importResult ? (openBlock(), createElementBlock("div", _hoisted_7$9, [
      createCommentVNode(" Success Items "),
      $setup.hasSuccess ? (openBlock(), createElementBlock("div", _hoisted_8$9, [
        createBaseVNode(
          "h3",
          null,
          " ✅ " + toDisplayString($setup.t("agora", "Successfully Created")) + " (" + toDisplayString($setup.importResult.success.length) + " " + toDisplayString($setup.t("agora", "items")) + ") ",
          1
          /* TEXT */
        ),
        createBaseVNode("ul", _hoisted_9$8, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.importResult.success, (message, index) => {
              return openBlock(), createElementBlock(
                "li",
                { key: index },
                toDisplayString(message),
                1
                /* TEXT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])) : createCommentVNode("v-if", true),
      createCommentVNode(" Skipped Items "),
      $setup.hasSkipped ? (openBlock(), createElementBlock("div", _hoisted_10$6, [
        createBaseVNode(
          "h3",
          null,
          " ⏭️ " + toDisplayString($setup.t("agora", "Skipped - Already Exist")) + " (" + toDisplayString($setup.importResult.skipped.length) + " " + toDisplayString($setup.t("agora", "items")) + ") ",
          1
          /* TEXT */
        ),
        createBaseVNode("ul", _hoisted_11$6, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.importResult.skipped, (message, index) => {
              return openBlock(), createElementBlock(
                "li",
                { key: index },
                toDisplayString(message),
                1
                /* TEXT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])) : createCommentVNode("v-if", true),
      createCommentVNode(" Failed Items "),
      $setup.hasErrors ? (openBlock(), createElementBlock("div", _hoisted_12$5, [
        createBaseVNode(
          "h3",
          null,
          " ❌ " + toDisplayString($setup.t("agora", "Failed to Process")) + " (" + toDisplayString($setup.importResult.failed.length) + " " + toDisplayString($setup.t("agora", "items")) + ") ",
          1
          /* TEXT */
        ),
        createBaseVNode("ul", _hoisted_13$5, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.importResult.failed, (message, index) => {
              return openBlock(), createElementBlock(
                "li",
                { key: index },
                toDisplayString(message),
                1
                /* TEXT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])) : createCommentVNode("v-if", true)
    ])) : createCommentVNode("v-if", true),
    createCommentVNode(" Action Buttons "),
    createBaseVNode("div", _hoisted_14$5, [
      createVNode($setup["NcButton"], {
        type: "primary",
        onClick: $setup.goToAgora
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Go to Agora")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode($setup["NcButton"], {
        type: "secondary",
        onClick: $setup.goToSettings
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Admin Settings")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode($setup["NcButton"], {
        type: "tertiary",
        onClick: $setup.closeWizard
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Close")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      })
    ])
  ]);
}
const StepResults = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-0e206bd8"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/steps/StepResults.vue"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "TemplateSetupWizard",
  setup(__props, { expose: __expose }) {
    __expose();
    const wizardStore = useTemplateWizardStore();
    const isOpen = computed({
      get: () => wizardStore.isOpen,
      set: (value) => {
        if (!value) {
          wizardStore.closeWizard();
        }
      }
    });
    const currentStepComponent = computed(() => {
      const stepMap = {
        "use-case": StepUseCaseSelection,
        "template-selection": StepTemplateSelection,
        "language": StepLanguageSelection,
        "preview": StepPreview,
        "summary": StepSummary,
        "importing": StepImporting,
        "results": StepResults
      };
      return stepMap[wizardStore.currentStep] || StepUseCaseSelection;
    });
    const stepTitle = computed(() => {
      const titles = {
        "use-case": translate("agora", "Choose Your Use Case"),
        "template-selection": translate("agora", "Select Template"),
        "language": translate("agora", "Choose Language"),
        "preview": translate("agora", "Preview Template"),
        "summary": translate("agora", "Review & Confirm"),
        "importing": translate("agora", "Importing Template"),
        "results": translate("agora", "Import Complete")
      };
      return titles[wizardStore.currentStep] || "";
    });
    const getStepTitle = (step) => {
      const titles = {
        "use-case": translate("agora", "Use Case"),
        "template-selection": translate("agora", "Template"),
        "language": translate("agora", "Language"),
        "preview": translate("agora", "Preview"),
        "summary": translate("agora", "Confirm"),
        "importing": translate("agora", "Importing"),
        "results": translate("agora", "Results")
      };
      return titles[step] || "";
    };
    const canShowNavigation = computed(() => {
      return !["importing", "results"].includes(wizardStore.currentStep);
    });
    const nextButtonLabel = computed(() => {
      if (wizardStore.currentStep === "summary") {
        return translate("agora", "Import Template");
      }
      return translate("agora", "Next");
    });
    const handleNext = async () => {
      if (wizardStore.currentStep === "summary") {
        try {
          await wizardStore.importTemplate();
        } catch (error) {
          console.error("Import failed:", error);
        }
      } else {
        wizardStore.nextStep();
      }
    };
    const handlePrevious = () => {
      wizardStore.previousStep();
    };
    const handleClose = () => {
      wizardStore.closeWizard();
    };
    watch(
      () => wizardStore.isDatabaseEmpty,
      (isEmpty) => {
        if (isEmpty && !wizardStore.isOpen) {
          console.info("Database is empty - wizard can be auto-launched");
        }
      }
    );
    const __returned__ = { wizardStore, isOpen, currentStepComponent, stepTitle, getStepTitle, canShowNavigation, nextButtonLabel, handleNext, handlePrevious, handleClose, get t() {
      return translate;
    }, get NcModal() {
      return NcModal;
    }, get NcButton() {
      return NcButton;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$s = { class: "wizard-container" };
const _hoisted_2$k = {
  key: 0,
  class: "wizard-progress"
};
const _hoisted_3$e = { class: "progress-dot" };
const _hoisted_4$c = { key: 0 };
const _hoisted_5$9 = { key: 1 };
const _hoisted_6$9 = { class: "progress-label" };
const _hoisted_7$8 = { class: "wizard-content" };
const _hoisted_8$8 = {
  key: 1,
  class: "wizard-actions"
};
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.isOpen ? (openBlock(), createBlock($setup["NcModal"], {
    key: 0,
    "can-close": !$setup.wizardStore.importing,
    name: $setup.stepTitle,
    size: "large",
    onClose: $setup.handleClose
  }, {
    default: withCtx(() => [
      createCommentVNode(" Step Content "),
      createBaseVNode("div", _hoisted_1$s, [
        createCommentVNode(" Progress Indicator "),
        $setup.canShowNavigation ? (openBlock(), createElementBlock("div", _hoisted_2$k, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.wizardStore.steps.filter((s) => !["importing", "results"].includes(s)), (step, index) => {
              return openBlock(), createElementBlock(
                "div",
                {
                  key: step,
                  class: normalizeClass(["progress-step", {
                    active: $setup.wizardStore.currentStep === step,
                    completed: index < $setup.wizardStore.currentStepIndex
                  }])
                },
                [
                  createBaseVNode("div", _hoisted_3$e, [
                    index < $setup.wizardStore.currentStepIndex ? (openBlock(), createElementBlock("span", _hoisted_4$c, "✓")) : (openBlock(), createElementBlock(
                      "span",
                      _hoisted_5$9,
                      toDisplayString(index + 1),
                      1
                      /* TEXT */
                    ))
                  ]),
                  createBaseVNode(
                    "div",
                    _hoisted_6$9,
                    toDisplayString($setup.getStepTitle(step)),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : createCommentVNode("v-if", true),
        createCommentVNode(" Dynamic Step Component "),
        createBaseVNode("div", _hoisted_7$8, [
          (openBlock(), createBlock(resolveDynamicComponent($setup.currentStepComponent)))
        ]),
        createCommentVNode(" Navigation Buttons "),
        $setup.canShowNavigation ? (openBlock(), createElementBlock("div", _hoisted_8$8, [
          $setup.wizardStore.canGoPrevious ? (openBlock(), createBlock($setup["NcButton"], {
            key: 0,
            type: "tertiary",
            onClick: $setup.handlePrevious
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Back")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true),
          _cache[0] || (_cache[0] = createBaseVNode(
            "div",
            { class: "spacer" },
            null,
            -1
            /* CACHED */
          )),
          createVNode($setup["NcButton"], {
            type: "secondary",
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
            disabled: !$setup.wizardStore.canGoNext,
            onClick: $setup.handleNext
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.nextButtonLabel),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])
        ])) : createCommentVNode("v-if", true)
      ])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["can-close", "name"])) : createCommentVNode("v-if", true);
}
const TemplateSetupWizard = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-d2f4206c"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Wizard/TemplateSetupWizard.vue"]]);
const _sfc_main$r = {
  __name: "AdminActivities",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$r = { class: "user_settings" };
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$r, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.useActivity,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.useActivity = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the tracking of activities with the Activities app")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"])
  ]);
}
const AdminActivities = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminActivities.vue"]]);
const _sfc_main$q = {
  __name: "AdminArchiveInquiries",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$q = { class: "user_settings" };
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$q, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.autoArchive,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.autoArchive = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the automatic inquiry archiving")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    $setup.appSettingsStore.autoArchive ? (openBlock(), createBlock($setup["InputDiv"], {
      key: 0,
      modelValue: $setup.appSettingsStore.autoArchiveOffset,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.autoArchiveOffset = $event),
      class: "settings_details",
      type: "number",
      inputmode: "numeric",
      "use-num-modifiers": "",
      label: $setup.t("agora", "Days after which inquiries should be archived after closing"),
      onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
    }, null, 8, ["modelValue", "label"])) : createCommentVNode("v-if", true)
  ]);
}
const AdminArchiveInquiries = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminArchiveInquiries.vue"]]);
const _sfc_main$p = {
  __name: "AdminDeleteInquiries",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$p = { class: "user_settings" };
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$p, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.autoDelete,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.autoDelete = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the automatic deletion of archived inquiries")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    $setup.appSettingsStore.autoDelete ? (openBlock(), createBlock($setup["InputDiv"], {
      key: 0,
      modelValue: $setup.appSettingsStore.autoDeleteOffset,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.autoDeleteOffset = $event),
      class: "settings_details",
      type: "number",
      inputmode: "numeric",
      "use-num-modifiers": "",
      label: $setup.t("inquiries", "Days after which archived inquiries should be finally deleted"),
      onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
    }, null, 8, ["modelValue", "label"])) : createCommentVNode("v-if", true)
  ]);
}
const AdminDeleteInquiries = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminDeleteInquiries.vue"]]);
const _sfc_main$o = {
  __name: "AdminExpireInquiries",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$o = { class: "user_settings" };
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$o, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.autoExpire,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.autoExpire = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the automatic inquiry expiration")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    $setup.appSettingsStore.autoExpire ? (openBlock(), createBlock($setup["InputDiv"], {
      key: 0,
      modelValue: $setup.appSettingsStore.autoExpireOffset,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.autoExpireOffset = $event),
      class: "settings_details",
      type: "number",
      inputmode: "numeric",
      "use-num-modifiers": "",
      label: $setup.t("agora", "Days after which inquiries should expire after being opened"),
      onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
    }, null, 8, ["modelValue", "label"])) : createCommentVNode("v-if", true)
  ]);
}
const AdminExpireInquiries = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminExpireInquiries.vue"]]);
const _sfc_main$n = {
  name: "LanguageMarkdownIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
const _hoisted_1$n = ["aria-hidden", "aria-label"];
const _hoisted_2$j = ["fill", "width", "height"];
const _hoisted_3$d = { d: "M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z" };
const _hoisted_4$b = { key: 0 };
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon language-markdown-icon",
    role: "img",
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
  }), [
    (openBlock(), createElementBlock("svg", {
      fill: $props.fillColor,
      class: "material-design-icon__svg",
      width: $props.size,
      height: $props.size,
      viewBox: "0 0 24 24"
    }, [
      createBaseVNode("path", _hoisted_3$d, [
        $props.title ? (openBlock(), createElementBlock(
          "title",
          _hoisted_4$b,
          toDisplayString($props.title),
          1
          /* TEXT */
        )) : createCommentVNode("v-if", true)
      ])
    ], 8, _hoisted_2$j))
  ], 16, _hoisted_1$n);
}
const LanguageMarkdownIcon = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__file", "/var/www/nextcloud/apps/agora/node_modules/vue-material-design-icons/LanguageMarkdown.vue"]]);
const _sfc_main$m = {
  __name: "AdminEmail",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const markedPrefix = {
      prefix: "disclaimer-"
    };
    const preview = ref(false);
    const markedDisclaimer = computed(() => {
      d.use(gfmHeadingId(markedPrefix));
      return purify.sanitize(d.parse(appSettingsStore.disclaimer));
    });
    const __returned__ = { appSettingsStore, markedPrefix, preview, markedDisclaimer, computed, ref, get marked() {
      return d;
    }, get gfmHeadingId() {
      return gfmHeadingId;
    }, get DOMPurify() {
      return purify;
    }, LanguageMarkdownIcon, get t() {
      return translate;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$m = { class: "user_settings" };
const _hoisted_2$i = { class: "disclaimer_group" };
const _hoisted_3$c = { class: "grow_title" };
const _hoisted_4$a = ["innerHTML"];
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$m, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.legalTermsInEmail,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.legalTermsInEmail = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Add terms links also to the email footer")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    createBaseVNode("div", _hoisted_2$i, [
      createBaseVNode("div", _hoisted_3$c, [
        createBaseVNode(
          "span",
          null,
          toDisplayString($setup.t("agora", "Additional email disclaimer")),
          1
          /* TEXT */
        ),
        createVNode($setup["LanguageMarkdownIcon"])
      ]),
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.preview,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.preview = $event),
        type: "switch",
        onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Preview")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ]),
    withDirectives(createBaseVNode(
      "textarea",
      {
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.disclaimer = $event),
        onChange: _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
      },
      null,
      544
      /* NEED_HYDRATION, NEED_PATCH */
    ), [
      [vShow, !$setup.preview],
      [vModelText, $setup.appSettingsStore.disclaimer]
    ]),
    createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
    withDirectives(createBaseVNode("div", {
      class: "inquiries-markdown",
      innerHTML: $setup.markedDisclaimer
    }, null, 8, _hoisted_4$a), [
      [vShow, $setup.preview]
    ])
  ]);
}
const AdminEmail = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminEmail.vue"]]);
const _sfc_main$l = {
  __name: "AdminModeration",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$l = { class: "user_settings" };
const _hoisted_2$h = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.useModeration,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.useModeration = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the moderation feature")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.allowModeration ? (openBlock(), createElementBlock("div", _hoisted_2$h, [
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.appSettingsStore.officialBypassModeration,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.officialBypassModeration = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        type: "switch"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Official user(s) bypass moderation")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminModeration = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminModeration.vue"]]);
const _sfc_main$k = {
  __name: "AdminJobs",
  setup(__props, { expose: __expose }) {
    __expose();
    const autoreminder = {
      text: translate("agora", "Run autoreminder"),
      disabled: false
    };
    const janitor = {
      text: translate("agora", "Run janitor"),
      disabled: false
    };
    const notification = {
      text: translate("agora", "Run notification"),
      disabled: false
    };
    async function runAutoReminderJob() {
      try {
        adminJobs.runAutoReminder();
        autoreminder.disabled = true;
        autoreminder.text = translate("agora", "Autoreminder started");
      } catch (error) {
        autoreminder.text = translate("agora", "Autoreminder failed");
        Logger.error("Error on executing autoreminder job", { error });
      } finally {
        autoreminder.disabled = true;
      }
    }
    async function runJanitorJob() {
      try {
        adminJobs.runJanitor();
        janitor.text = translate("agora", "Janitor started");
      } catch (error) {
        janitor.text = translate("agora", "Janitor failed");
        Logger.error("Error on executing janitor job", { error });
      } finally {
        janitor.disabled = true;
      }
    }
    async function runNotificationJob() {
      try {
        adminJobs.runNotification();
        notification.text = translate("agora", "Notification started");
      } catch (error) {
        notification.text = translate("agora", "Notification failed");
        Logger.error("Error on executing notification job", { error });
      } finally {
        notification.disabled = true;
      }
    }
    const __returned__ = { autoreminder, janitor, notification, runAutoReminderJob, runJanitorJob, runNotificationJob, get Logger() {
      return Logger;
    }, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get AdminAPI() {
      return adminJobs;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$k = { class: "user_settings" };
const _hoisted_2$g = { class: "job_hints" };
const _hoisted_3$b = { class: "job_buttons_section" };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$k, [
    createBaseVNode("div", _hoisted_2$g, [
      createBaseVNode(
        "p",
        null,
        toDisplayString($setup.t(
          "agora",
          "Please understand, that the jobs were defined as asynchronous jobs by intention."
        )) + " " + toDisplayString($setup.t(
          "agora",
          "Only use them, if it is absolutely neccessary (i.error. your cron does not work properly) or for testing."
        )) + " " + toDisplayString($setup.t(
          "agora",
          "Starting the jobs does not mean, that the rules for these actions are overridden."
        )),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        null,
        toDisplayString($setup.t(
          "agora",
          "Each job can only be run once. If you want to rerun them, you have to refresh the page."
        )) + " " + toDisplayString($setup.t("agora", "If you want to see the result please check the logs")),
        1
        /* TEXT */
      )
    ]),
    createBaseVNode("div", _hoisted_3$b, [
      createVNode($setup["NcButton"], {
        variant: "primary",
        "aria-label": $setup.autoreminder.text,
        disabled: $setup.autoreminder.disabled,
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.runAutoReminderJob())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.autoreminder.text),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["aria-label", "disabled"]),
      createVNode($setup["NcButton"], {
        variant: "primary",
        "aria-label": $setup.janitor.text,
        disabled: $setup.janitor.disabled,
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.runJanitorJob())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.janitor.text),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["aria-label", "disabled"]),
      createVNode($setup["NcButton"], {
        variant: "primary",
        "aria-label": $setup.notification.text,
        disabled: $setup.notification.disabled,
        onClick: _cache[2] || (_cache[2] = ($event) => $setup.runNotificationJob())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.notification.text),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["aria-label", "disabled"])
    ])
  ]);
}
const AdminJobs = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminJobs.vue"]]);
const _sfc_main$j = {
  __name: "AdminLegal",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const placeholder = computed(() => {
      let privacy = translate("agora", "Enter the URL of your privacy policy");
      let imprint = translate("agora", "Enter the URL of your legal notice");
      if (appSettingsStore.defaultPrivacyUrl) {
        privacy = appSettingsStore.defaultPrivacyUrl;
      }
      if (appSettingsStore.defaultImprintUrl) {
        imprint = appSettingsStore.defaultImprintUrl;
      }
      return {
        privacy,
        imprint
      };
    });
    const __returned__ = { appSettingsStore, placeholder, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, computed, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$j = { class: "user_settings" };
const _hoisted_2$f = {
  key: 0,
  class: "user_settings"
};
const _hoisted_3$a = { class: "settings-description" };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createBaseVNode("div", _hoisted_1$j, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.useSiteLegalTerms,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.useSiteLegalTerms = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("inquiries", "Use the default terms for public inquiries and enable the default footer")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ]),
      !$setup.appSettingsStore.useSiteLegalTerms ? (openBlock(), createElementBlock("div", _hoisted_2$f, [
        createBaseVNode(
          "p",
          _hoisted_3$a,
          toDisplayString($setup.t("inquiries", "If you want to use different terms for public inquiries, enter them below.")),
          1
          /* TEXT */
        ),
        createVNode($setup["InputDiv"], {
          modelValue: $setup.appSettingsStore.privacyUrl,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.privacyUrl = $event),
          type: "url",
          placeholder: $setup.placeholder.privacy,
          label: $setup.t("agora", "Privacy policy link"),
          onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        }, null, 8, ["modelValue", "placeholder", "label"]),
        createVNode($setup["InputDiv"], {
          modelValue: $setup.appSettingsStore.imprintUrl,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.imprintUrl = $event),
          type: "url",
          inputmode: "url",
          label: $setup.t("agora", "Legal terms link"),
          placeholder: $setup.placeholder.imprint,
          onChange: _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
        }, null, 8, ["modelValue", "label", "placeholder"])
      ])) : createCommentVNode("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const AdminLegal = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminLegal.vue"]]);
const _sfc_main$i = {
  __name: "AdminFamiliesManager",
  emits: ["familySelected"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const emit = __emit;
    const appSettingsStore = useAppSettingsStore();
    const editingFamily = ref(null);
    const newFamily = ref({
      family_type: "",
      label: "",
      description: "",
      icon: null,
      sort_order: 0
    });
    const findIconById = (iconId) => {
      if (!iconId) return null;
      return availableIcons.value.find((icon) => icon.id === iconId) || null;
    };
    const startEditing = (family) => {
      editingFamily.value = {
        ...family,
        icon: findIconById(family.icon)
        // Convert string icon to object for NcSelect
      };
    };
    const availableIcons = computed(
      () => Object.keys(InquiryGeneralIcons).filter((key) => key !== "default").map((iconId) => ({
        id: iconId,
        label: translate("agora", iconId.replace(/([A-Z])/g, " $1").trim())
      }))
    );
    const getIconComponent = (iconName) => InquiryGeneralIcons[iconName] || InquiryGeneralIcons.default;
    const familiesWithStats = computed(() => appSettingsStore.inquiryFamilyTab.map((family) => {
      const typesCount = appSettingsStore.inquiryTypeTab.filter(
        (type) => type.family === family.family_type
      ).length;
      return {
        ...family,
        typesCount
      };
    }));
    const extractIconId = (icon) => {
      if (!icon) return "";
      if (typeof icon === "string") return icon;
      if (typeof icon === "object") return icon.id || "";
      return String(icon);
    };
    const addFamily = async () => {
      if (!newFamily.value.family_type) {
        showError(translate("agora", "Inquiry family type is mandatory"), { timeout: 2e3 });
        return;
      }
      await appSettingsStore.addFamily({
        ...newFamily.value,
        icon: extractIconId(newFamily.value.icon),
        created: Date.now()
      });
      newFamily.value = {
        family_type: "",
        label: "",
        description: "",
        icon: "",
        sort_order: appSettingsStore.inquiryFamilyTab.length
      };
    };
    const updateFamily = async (family) => {
      await appSettingsStore.updateFamily(family.id, {
        ...family,
        icon: extractIconId(family.icon)
      });
      editingFamily.value = null;
    };
    const deleteFamily = async (familyId) => {
      if (confirm(translate("agora", "Are you sure you want to delete this family?"))) {
        await appSettingsStore.deleteFamily(familyId);
      }
    };
    const selectFamily = (family) => {
      emit("familySelected", family);
    };
    const __returned__ = { emit, appSettingsStore, editingFamily, newFamily, findIconById, startEditing, availableIcons, getIconComponent, familiesWithStats, extractIconId, addFamily, updateFamily, deleteFamily, selectFamily, computed, ref, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get NcInputField() {
      return NcInputField;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, get InquiryGeneralIcons() {
      return InquiryGeneralIcons;
    }, get showError() {
      return showError;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$i = { class: "families-manager" };
const _hoisted_2$e = { class: "description" };
const _hoisted_3$9 = { class: "families-list" };
const _hoisted_4$9 = ["onClick"];
const _hoisted_5$8 = { class: "family-content" };
const _hoisted_6$8 = { class: "family-icon" };
const _hoisted_7$7 = { class: "family-info" };
const _hoisted_8$7 = { class: "family-type" };
const _hoisted_9$7 = {
  key: 0,
  class: "family-description"
};
const _hoisted_10$5 = { class: "family-stats" };
const _hoisted_11$5 = { class: "types-count" };
const _hoisted_12$4 = { class: "family-actions" };
const _hoisted_13$4 = { class: "add-family-form" };
const _hoisted_14$4 = { class: "form-grid" };
const _hoisted_15$4 = { class: "form-row" };
const _hoisted_16$4 = { class: "form-actions" };
const _hoisted_17$4 = {
  key: 0,
  class: "modal-overlay"
};
const _hoisted_18$3 = { class: "modal-content large-modal" };
const _hoisted_19$3 = { class: "form-grid" };
const _hoisted_20$3 = { class: "form-row" };
const _hoisted_21$3 = { class: "modal-actions" };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$i, [
    createBaseVNode(
      "h2",
      null,
      toDisplayString($setup.t("agora", "Inquiry Families Management")),
      1
      /* TEXT */
    ),
    createBaseVNode(
      "p",
      _hoisted_2$e,
      toDisplayString($setup.t("agora", "Manage inquiry families to organize different types of inquiries. Each family can contain multiple inquiry types.")),
      1
      /* TEXT */
    ),
    createCommentVNode(" Families List "),
    createBaseVNode("div", _hoisted_3$9, [
      createBaseVNode(
        "h3",
        null,
        toDisplayString($setup.t("agora", "Existing Families")),
        1
        /* TEXT */
      ),
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.familiesWithStats, (family) => {
          return openBlock(), createElementBlock("div", {
            key: family.id,
            class: "family-item",
            onClick: ($event) => $setup.selectFamily(family)
          }, [
            createBaseVNode("div", _hoisted_5$8, [
              createBaseVNode("div", _hoisted_6$8, [
                (openBlock(), createBlock(resolveDynamicComponent($setup.getIconComponent(family.icon)), { size: 20 }))
              ]),
              createBaseVNode("div", _hoisted_7$7, [
                createBaseVNode(
                  "h4",
                  null,
                  toDisplayString(family.label),
                  1
                  /* TEXT */
                ),
                createBaseVNode(
                  "p",
                  _hoisted_8$7,
                  toDisplayString(family.family_type),
                  1
                  /* TEXT */
                ),
                family.description ? (openBlock(), createElementBlock(
                  "p",
                  _hoisted_9$7,
                  toDisplayString(family.description),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true),
                createBaseVNode("div", _hoisted_10$5, [
                  createBaseVNode(
                    "span",
                    _hoisted_11$5,
                    toDisplayString($setup.t("agora", "{count} types", { count: family.typesCount })),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_12$4, [
              createVNode($setup["NcButton"], {
                onClick: withModifiers(($event) => $setup.startEditing(family), ["stop"])
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.t("agora", "Edit")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              createVNode($setup["NcButton"], {
                onClick: withModifiers(($event) => $setup.deleteFamily(family.id), ["stop"])
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.t("agora", "Delete")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ])
          ], 8, _hoisted_4$9);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]),
    createCommentVNode(" Add New Family Form "),
    createBaseVNode("div", _hoisted_13$4, [
      createBaseVNode(
        "h3",
        null,
        toDisplayString($setup.t("agora", "Add New Family")),
        1
        /* TEXT */
      ),
      createBaseVNode("div", _hoisted_14$4, [
        createBaseVNode("div", _hoisted_15$4, [
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newFamily.family_type,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.newFamily.family_type = $event),
            label: $setup.t("agora", "Family Type Key"),
            placeholder: $setup.t("agora", "e.g., deliberative, consultative"),
            required: "",
            class: "form-field"
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newFamily.label,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newFamily.label = $event),
            label: $setup.t("agora", "Display Label"),
            placeholder: $setup.t("agora", "e.g., Deliberative Process"),
            required: "",
            class: "form-field"
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcSelect"], {
            modelValue: $setup.newFamily.icon,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newFamily.icon = $event),
            options: $setup.availableIcons,
            clearable: false,
            "track-by": "id",
            placeholder: $setup.t("agora", "Select an icon"),
            class: "form-field"
          }, null, 8, ["modelValue", "options", "placeholder"])
        ]),
        createVNode($setup["NcInputField"], {
          modelValue: $setup.newFamily.description,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newFamily.description = $event),
          label: $setup.t("agora", "Description"),
          placeholder: $setup.t("agora", "Optional description"),
          type: "textarea",
          class: "full-width"
        }, null, 8, ["modelValue", "label", "placeholder"]),
        createVNode($setup["NcInputField"], {
          modelValue: $setup.newFamily.sort_order,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newFamily.sort_order = $event),
          label: $setup.t("agora", "Sort Order"),
          type: "number",
          min: 0,
          class: "form-field"
        }, null, 8, ["modelValue", "label"]),
        createBaseVNode("div", _hoisted_16$4, [
          createVNode($setup["NcButton"], {
            type: "primary",
            disabled: !$setup.newFamily.family_type || !$setup.newFamily.label,
            onClick: $setup.addFamily
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Add Family")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])
        ])
      ])
    ]),
    createCommentVNode(" Edit Family Modal "),
    $setup.editingFamily ? (openBlock(), createElementBlock("div", _hoisted_17$4, [
      createBaseVNode("div", _hoisted_18$3, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.t("agora", "Edit Family")),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_19$3, [
          createBaseVNode("div", _hoisted_20$3, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingFamily.family_type,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.editingFamily.family_type = $event),
              label: $setup.t("agora", "Family Type Key"),
              required: "",
              class: "form-field"
            }, null, 8, ["modelValue", "label"]),
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingFamily.label,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.editingFamily.label = $event),
              label: $setup.t("agora", "Display Label"),
              required: "",
              class: "form-field"
            }, null, 8, ["modelValue", "label"]),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.editingFamily.icon,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.editingFamily.icon = $event),
              options: $setup.availableIcons,
              "track-by": "id",
              clearable: false,
              placeholder: $setup.t("agora", "Select an icon"),
              class: "form-field"
            }, null, 8, ["modelValue", "options", "placeholder"])
          ])
        ]),
        createBaseVNode("div", null, [
          createVNode($setup["NcInputField"], {
            modelValue: $setup.editingFamily.description,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.editingFamily.description = $event),
            label: $setup.t("agora", "Description"),
            type: "textarea",
            class: "full-width"
          }, null, 8, ["modelValue", "label"]),
          createBaseVNode("div", _hoisted_21$3, [
            createVNode($setup["NcButton"], {
              onClick: _cache[9] || (_cache[9] = ($event) => $setup.editingFamily = null)
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
              onClick: _cache[10] || (_cache[10] = ($event) => $setup.updateFamily($setup.editingFamily))
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Save Changes")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ])
      ])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminFamiliesManager = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-b0578289"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminFamiliesManager.vue"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "AdminTypesManager",
  props: {
    selectedFamily: { type: Object, required: false }
  },
  emits: ["typeSelected", "backToFamilies"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const appSettingsStore = useAppSettingsStore();
    const editingType = ref(null);
    const newType = ref({
      inquiry_type: "",
      label: "",
      family: props.selectedFamily?.family_type || "",
      icon: "",
      description: "",
      fields: "[]",
      allowed_response: "[]",
      allowed_transformation: "[]",
      allowed_option_type: "[]"
    });
    const getIconComponent = (iconName) => InquiryGeneralIcons[iconName] || InquiryGeneralIcons.default;
    const availableIcons = computed(
      () => Object.keys(InquiryGeneralIcons).filter((key) => key !== "default").map((iconId) => ({
        id: iconId,
        label: translate("agora", iconId.replace(/([A-Z])/g, " $1").trim())
      }))
    );
    const extractIconId = (icon) => {
      if (!icon) return "";
      if (typeof icon === "string") return icon;
      if (typeof icon === "object") return icon.id || "";
      return String(icon);
    };
    const familyTypes = computed(
      () => appSettingsStore.inquiryTypeTab.filter(
        (type) => type.family === props.selectedFamily?.family_type
      )
    );
    const convertToJsonString = (value) => {
      if (typeof value === "string") return value;
      return JSON.stringify(value || []);
    };
    const addType = async () => {
      if (!newType.value.inquiry_type) {
        showError(translate("agora", "Inquiry type is mandatory"), { timeout: 2e3 });
        return;
      }
      await appSettingsStore.addInquiryType({
        ...newType.value,
        family: props.selectedFamily.family_type,
        created: Date.now(),
        icon: extractIconId(newType.value.icon),
        description: newType.value.description || "",
        fields: convertToJsonString(newType.value.fields),
        allowed_response: convertToJsonString(newType.value.allowed_response),
        allowed_transformation: convertToJsonString(newType.value.allowed_transformation),
        allowed_option_type: convertToJsonString(newType.value.allowed_option_type)
      });
      newType.value = {
        inquiry_type: "",
        label: "",
        family: props.selectedFamily.family_type,
        icon: "",
        description: "",
        fields: "[]",
        allowed_response: "[]",
        allowed_transformation: "[]",
        allowed_option_type: "[]"
      };
    };
    const updateType = async (type) => {
      if (!type.inquiry_type) {
        showError(translate("agora", "Inquiry type is mandatory"), { timeout: 2e3 });
        return;
      }
      await appSettingsStore.updateInquiryType(type.id, {
        ...type,
        icon: extractIconId(type.icon),
        fields: convertToJsonString(type.fields),
        allowed_response: convertToJsonString(type.allowed_response),
        allowed_transformation: convertToJsonString(type.allowed_transformation),
        allowed_option_type: convertToJsonString(type.allowed_option_type)
      });
      editingType.value = null;
    };
    const deleteType = async (typeId) => {
      if (confirm(translate("agora", "Are you sure you want to delete this inquiry type?"))) {
        await appSettingsStore.deleteType(typeId);
      }
    };
    const openTypeSettings = (type) => {
      emit("typeSelected", type);
    };
    const __returned__ = { props, emit, appSettingsStore, editingType, newType, getIconComponent, availableIcons, extractIconId, familyTypes, convertToJsonString, addType, updateType, deleteType, openTypeSettings, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get NcInputField() {
      return NcInputField;
    }, get NcSelect() {
      return NcSelect;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$h = { class: "types-manager" };
const _hoisted_2$d = { class: "header" };
const _hoisted_3$8 = { class: "types-list" };
const _hoisted_4$8 = { class: "list-description" };
const _hoisted_5$7 = { class: "types-grid" };
const _hoisted_6$7 = ["onClick"];
const _hoisted_7$6 = { class: "type-card-content" };
const _hoisted_8$6 = { class: "type-icon" };
const _hoisted_9$6 = { class: "type-info" };
const _hoisted_10$4 = { class: "type-key" };
const _hoisted_11$4 = {
  key: 0,
  class: "type-description"
};
const _hoisted_12$3 = { class: "type-actions" };
const _hoisted_13$3 = { class: "secondary-actions" };
const _hoisted_14$3 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_15$3 = { class: "add-type-form" };
const _hoisted_16$3 = { class: "form-grid" };
const _hoisted_17$3 = { class: "form-row" };
const _hoisted_18$2 = { class: "form-row" };
const _hoisted_19$2 = { class: "form-actions" };
const _hoisted_20$2 = {
  key: 0,
  class: "modal-overlay"
};
const _hoisted_21$2 = { class: "modal-content large-modal" };
const _hoisted_22$1 = { class: "form-grid" };
const _hoisted_23$1 = { class: "form-row" };
const _hoisted_24$1 = { class: "form-row" };
const _hoisted_25$1 = { class: "modal-actions" };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$h, [
    createBaseVNode("div", _hoisted_2$d, [
      createVNode($setup["NcButton"], {
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.emit("backToFamilies"))
      }, {
        default: withCtx(() => [
          createTextVNode(
            " ← " + toDisplayString($setup.t("agora", "Back to Families")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }),
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Types for {family}", { family: $props.selectedFamily?.label })),
        1
        /* TEXT */
      )
    ]),
    createCommentVNode(" Types List "),
    createBaseVNode("div", _hoisted_3$8, [
      createBaseVNode(
        "h3",
        null,
        toDisplayString($setup.t("agora", "Configured Types")),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        _hoisted_4$8,
        toDisplayString($setup.t("agora", "Click on a type to configure its rights and status settings")),
        1
        /* TEXT */
      ),
      createBaseVNode("div", _hoisted_5$7, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList($setup.familyTypes, (type) => {
            return openBlock(), createElementBlock("div", {
              key: type.id,
              class: "type-card",
              onClick: ($event) => $setup.openTypeSettings(type)
            }, [
              createBaseVNode("div", _hoisted_7$6, [
                createBaseVNode("div", _hoisted_8$6, [
                  (openBlock(), createBlock(resolveDynamicComponent($setup.getIconComponent(type.icon)), { size: 20 }))
                ]),
                createBaseVNode("div", _hoisted_9$6, [
                  createBaseVNode(
                    "h4",
                    null,
                    toDisplayString(type.label),
                    1
                    /* TEXT */
                  ),
                  createBaseVNode(
                    "p",
                    _hoisted_10$4,
                    toDisplayString(type.inquiry_type),
                    1
                    /* TEXT */
                  ),
                  type.description ? (openBlock(), createElementBlock(
                    "p",
                    _hoisted_11$4,
                    toDisplayString(type.description),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ])
              ]),
              createBaseVNode("div", _hoisted_12$3, [
                createVNode($setup["NcButton"], {
                  type: "primary",
                  class: "configure-btn",
                  onClick: withModifiers(($event) => $setup.openTypeSettings(type), ["stop"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString($setup.t("agora", "Configure")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"]),
                createBaseVNode("div", _hoisted_13$3, [
                  createVNode($setup["NcButton"], {
                    class: "edit-btn",
                    onClick: withModifiers(($event) => $setup.editingType = {
                      ...type,
                      fields: JSON.stringify(type.fields || []),
                      allowed_response: JSON.stringify(type.allowed_response || []),
                      allowed_transformation: JSON.stringify(type.allowed_transformation || []),
                      allowed_option_type: JSON.stringify(type.allowed_option_type || [])
                    }, ["stop"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.t("agora", "Edit")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"]),
                  createVNode($setup["NcButton"], {
                    class: "delete-btn",
                    onClick: withModifiers(($event) => $setup.deleteType(type.id), ["stop"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.t("agora", "Delete")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"])
                ])
              ])
            ], 8, _hoisted_6$7);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      $setup.familyTypes.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_14$3, [
        createBaseVNode(
          "p",
          null,
          toDisplayString($setup.t("agora", "No types configured for this family yet")),
          1
          /* TEXT */
        )
      ])) : createCommentVNode("v-if", true)
    ]),
    createCommentVNode(" Add New Type Form "),
    createBaseVNode("div", _hoisted_15$3, [
      createBaseVNode(
        "h3",
        null,
        toDisplayString($setup.t("agora", "Add New Type to {family}", { family: $props.selectedFamily?.label })),
        1
        /* TEXT */
      ),
      createBaseVNode("div", _hoisted_16$3, [
        createBaseVNode("div", _hoisted_17$3, [
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newType.inquiry_type,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newType.inquiry_type = $event),
            label: $setup.t("agora", "Type Key"),
            placeholder: $setup.t("agora", "e.g., petition, survey, poll"),
            required: "",
            class: "form-field"
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newType.label,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newType.label = $event),
            label: $setup.t("agora", "Display Label"),
            placeholder: $setup.t("agora", "e.g., Public Petition, Survey"),
            required: "",
            class: "form-field"
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcSelect"], {
            modelValue: $setup.newType.icon,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newType.icon = $event),
            options: $setup.availableIcons,
            clearable: false,
            placeholder: $setup.t("agora", "Select an icon"),
            label: "label",
            class: "form-field"
          }, null, 8, ["modelValue", "options", "placeholder"])
        ]),
        createVNode($setup["NcInputField"], {
          modelValue: $setup.newType.description,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newType.description = $event),
          label: $setup.t("agora", "Description"),
          type: "textarea",
          class: "full-width"
        }, null, 8, ["modelValue", "label"]),
        createBaseVNode("div", _hoisted_18$2, [
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newType.fields,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.newType.fields = $event),
            label: $setup.t("agora", "Fields Configuration (JSON)"),
            type: "textarea",
            placeholder: `e.g., ["title", "description", "deadline"]`,
            class: "form-field"
          }, null, 8, ["modelValue", "label"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newType.allowed_response,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.newType.allowed_response = $event),
            label: $setup.t("agora", "Allowed Responses (JSON)"),
            type: "textarea",
            placeholder: `e.g., ["vote_yes_no", "comment"]`,
            class: "form-field"
          }, null, 8, ["modelValue", "label"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newType.allowed_transformation,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.newType.allowed_transformation = $event),
            label: $setup.t("agora", "Allowed Transformations (JSON)"),
            type: "textarea",
            placeholder: `e.g., ["official_proposal"]`,
            class: "form-field"
          }, null, 8, ["modelValue", "label"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newType.allowed_option_type,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.newType.allowed_option_type = $event),
            label: $setup.t("agora", "Allowed Option types (JSON)"),
            type: "textarea",
            placeholder: `e.g., ["official_proposal"]`,
            class: "form-field"
          }, null, 8, ["modelValue", "label"])
        ]),
        createBaseVNode("div", _hoisted_19$2, [
          createVNode($setup["NcButton"], {
            type: "primary",
            disabled: !$setup.newType.inquiry_type || !$setup.newType.label,
            onClick: $setup.addType
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Add Type")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])
        ])
      ])
    ]),
    createCommentVNode(" Edit Type Modal "),
    $setup.editingType ? (openBlock(), createElementBlock("div", _hoisted_20$2, [
      createBaseVNode("div", _hoisted_21$2, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.t("agora", "Edit Inquiry Type")),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_22$1, [
          createBaseVNode("div", _hoisted_23$1, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingType.inquiry_type,
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.editingType.inquiry_type = $event),
              label: $setup.t("agora", "Type Key"),
              required: "",
              class: "form-field"
            }, null, 8, ["modelValue", "label"]),
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingType.label,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.editingType.label = $event),
              label: $setup.t("agora", "Display Label"),
              required: "",
              class: "form-field"
            }, null, 8, ["modelValue", "label"]),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.editingType.icon,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.editingType.icon = $event),
              options: $setup.availableIcons,
              clearable: false,
              placeholder: $setup.t("agora", "Select an icon"),
              class: "form-field"
            }, null, 8, ["modelValue", "options", "placeholder"])
          ]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.editingType.description,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.editingType.description = $event),
            label: $setup.t("agora", "Description"),
            type: "textarea",
            class: "full-width"
          }, null, 8, ["modelValue", "label"]),
          createBaseVNode("div", _hoisted_24$1, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingType.fields,
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.editingType.fields = $event),
              label: $setup.t("agora", "Fields Configuration (JSON)"),
              type: "textarea",
              class: "form-field"
            }, null, 8, ["modelValue", "label"]),
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingType.allowed_response,
              "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.editingType.allowed_response = $event),
              label: $setup.t("agora", "Allowed Responses (JSON)"),
              type: "textarea",
              class: "form-field"
            }, null, 8, ["modelValue", "label"]),
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingType.allowed_transformation,
              "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.editingType.allowed_transformation = $event),
              label: $setup.t("agora", "Allowed Transformations (JSON)"),
              type: "textarea",
              class: "form-field"
            }, null, 8, ["modelValue", "label"]),
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingType.allowed_option_type,
              "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.editingType.allowed_option_type = $event),
              label: $setup.t("agora", "Allowed Option types (JSON)"),
              type: "textarea",
              class: "form-field"
            }, null, 8, ["modelValue", "label"])
          ]),
          createBaseVNode("div", _hoisted_25$1, [
            createVNode($setup["NcButton"], {
              onClick: _cache[17] || (_cache[17] = ($event) => $setup.editingType = null)
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
              onClick: _cache[18] || (_cache[18] = ($event) => $setup.updateType($setup.editingType))
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Save")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ])
      ])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminTypesManager = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-f2f32798"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminTypesManager.vue"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "AdminTypeRights",
  props: {
    selectedType: { type: Object, required: false }
  },
  emits: ["updateRights"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const appSettingsStore = useAppSettingsStore();
    const editorOptions = [
      { value: "wysiwyg", label: translate("agora", "Rich Text Editor") },
      { value: "textarea", label: translate("agora", "Simple Text Area") },
      { value: "texteditor", label: translate("agora", "Nextcloud text editor") }
    ];
    const typeRights = computed({
      get: () => {
        if (!props.selectedType) return {};
        return appSettingsStore.inquiryTypeRights[props.selectedType.inquiry_type] || getDefaultRights();
      },
      set: (newRights) => {
        if (props.selectedType) {
          emit("updateRights", props.selectedType.inquiry_type, newRights);
        }
      }
    });
    const getDefaultRights = () => ({
      supportInquiry: true,
      supportFeature: "binary",
      commentInquiry: true,
      useResourceInquiry: true,
      editorType: "wysiwyg"
    });
    watch(() => props.selectedType, (newType) => {
      if (newType && !appSettingsStore.inquiryTypeRights[newType.inquiry_type]) {
        const defaultRights = getDefaultRights();
        emit("updateRights", newType.inquiry_type, defaultRights);
      }
    }, { immediate: true });
    const updateRights = () => {
      if (props.selectedType) {
        emit("updateRights", props.selectedType.inquiry_type, typeRights.value);
      }
    };
    watch(() => typeRights.value.supportInquiry, (enabled) => {
      if (!enabled) {
        typeRights.value.supportFeature = "binary";
      }
      updateRights();
    });
    const __returned__ = { props, emit, appSettingsStore, editorOptions, typeRights, getDefaultRights, updateRights, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$g = { class: "type-rights" };
const _hoisted_2$c = { class: "header" };
const _hoisted_3$7 = {
  key: 0,
  class: "type-id"
};
const _hoisted_4$7 = {
  key: 0,
  class: "settings-container"
};
const _hoisted_5$6 = { class: "description" };
const _hoisted_6$6 = { class: "settings-list" };
const _hoisted_7$5 = { class: "setting-item" };
const _hoisted_8$5 = { class: "setting-description" };
const _hoisted_9$5 = {
  key: 0,
  class: "setting-item ternary-mode-setting"
};
const _hoisted_10$3 = { class: "setting-label" };
const _hoisted_11$3 = { class: "mode-options" };
const _hoisted_12$2 = { class: "mode-description" };
const _hoisted_13$2 = { class: "mode-options" };
const _hoisted_14$2 = { class: "mode-description" };
const _hoisted_15$2 = { class: "setting-item" };
const _hoisted_16$2 = { class: "setting-description" };
const _hoisted_17$2 = { class: "setting-item" };
const _hoisted_18$1 = { class: "setting-description" };
const _hoisted_19$1 = { class: "setting-item" };
const _hoisted_20$1 = { for: "editor-type-select" };
const _hoisted_21$1 = { class: "setting-description" };
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createBaseVNode("div", _hoisted_2$c, [
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Rights for {type}", { type: $props.selectedType?.label })),
        1
        /* TEXT */
      ),
      $props.selectedType ? (openBlock(), createElementBlock(
        "p",
        _hoisted_3$7,
        toDisplayString($props.selectedType.inquiry_type),
        1
        /* TEXT */
      )) : createCommentVNode("v-if", true)
    ]),
    $props.selectedType ? (openBlock(), createElementBlock("div", _hoisted_4$7, [
      createBaseVNode(
        "p",
        _hoisted_5$6,
        toDisplayString($setup.t("agora", "Configure default rights and settings for this inquiry type")),
        1
        /* TEXT */
      ),
      createBaseVNode("div", _hoisted_6$6, [
        createBaseVNode("div", _hoisted_7$5, [
          createVNode($setup["NcCheckboxRadioSwitch"], {
            modelValue: $setup.typeRights.supportInquiry,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = ($event) => $setup.typeRights.supportInquiry = $event),
              $setup.updateRights
            ],
            type: "switch"
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Allow support")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"]),
          createBaseVNode(
            "p",
            _hoisted_8$5,
            toDisplayString($setup.t("agora", "Allow users to support this inquiry type")),
            1
            /* TEXT */
          )
        ]),
        createCommentVNode(" Ternary mode setting - only show when support is enabled "),
        $setup.typeRights.supportInquiry ? (openBlock(), createElementBlock("div", _hoisted_9$5, [
          createBaseVNode(
            "div",
            _hoisted_10$3,
            toDisplayString($setup.t("agora", "Support mode")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_11$3, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.typeRights.supportFeature,
              "onUpdate:modelValue": [
                _cache[1] || (_cache[1] = ($event) => $setup.typeRights.supportFeature = $event),
                $setup.updateRights
              ],
              type: "radio",
              value: "binary",
              name: "supportFeature"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Simple mode")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_12$2,
              toDisplayString($setup.t("agora", "Users can support or not support")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_13$2, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.typeRights.supportFeature,
              "onUpdate:modelValue": [
                _cache[2] || (_cache[2] = ($event) => $setup.typeRights.supportFeature = $event),
                $setup.updateRights
              ],
              type: "radio",
              value: "ternary",
              name: "supportFeature"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Ternary mode")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_14$2,
              toDisplayString($setup.t("agora", "Users can support, be neutral, or oppose")),
              1
              /* TEXT */
            )
          ])
        ])) : createCommentVNode("v-if", true)
      ]),
      createBaseVNode("div", _hoisted_15$2, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.typeRights.commentInquiry,
          "onUpdate:modelValue": [
            _cache[3] || (_cache[3] = ($event) => $setup.typeRights.commentInquiry = $event),
            $setup.updateRights
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Allow comments")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_16$2,
          toDisplayString($setup.t("agora", "Allow users to comment on this inquiry type")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_17$2, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.typeRights.useResourceInquiry,
          "onUpdate:modelValue": [
            _cache[4] || (_cache[4] = ($event) => $setup.typeRights.useResourceInquiry = $event),
            $setup.updateRights
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Allow using resources")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_18$1,
          toDisplayString($setup.t("agora", "Allow users to use resources for this inquiry type")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_19$1, [
        createBaseVNode(
          "label",
          _hoisted_20$1,
          toDisplayString($setup.t("agora", "Editor type")),
          1
          /* TEXT */
        ),
        createVNode($setup["NcSelect"], {
          id: "editor-type-select",
          modelValue: $setup.typeRights.editorType,
          "onUpdate:modelValue": [
            _cache[5] || (_cache[5] = ($event) => $setup.typeRights.editorType = $event),
            $setup.updateRights
          ],
          options: $setup.editorOptions,
          "option-value": "value",
          "option-label": "label",
          class: "editor-select"
        }, null, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_21$1,
          toDisplayString($setup.t("agora", "Select the editor type for this inquiry")),
          1
          /* TEXT */
        )
      ])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminTypeRights = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-60290e39"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminTypeRights.vue"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "AdminTypeStatus",
  props: {
    selectedType: { type: Object, required: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const appSettingsStore = useAppSettingsStore();
    const editingStatus = ref(null);
    const newStatus = ref({
      statusKey: "",
      label: "",
      description: "",
      isFinal: false,
      icon: "ClockOutline"
    });
    const availableIcons = computed(
      () => Object.keys(StatusIcons).filter((key) => key !== "default").map((iconId) => ({
        id: iconId,
        label: translate("agora", iconId.replace(/([A-Z])/g, " $1").trim())
      }))
    );
    const statuses = computed(
      () => props.selectedType ? appSettingsStore.getStatusesForInquiryType(props.selectedType.inquiry_type) : []
    );
    const getIconComponent = (iconName) => StatusIcons[iconName] || StatusIcons.ClockOutline;
    const addStatus = () => {
      if (!newStatus.value.statusKey || !newStatus.value.label || !props.selectedType) {
        return;
      }
      appSettingsStore.addStatusForInquiryType(props.selectedType.inquiry_type, {
        ...newStatus.value,
        icon: String(newStatus.value.icon)
      });
      newStatus.value = {
        statusKey: "",
        label: "",
        description: "",
        isFinal: false,
        icon: "ClockOutline"
      };
    };
    const editStatus = (status) => {
      editingStatus.value = {
        id: status.id,
        statusKey: status.statusKey,
        label: status.label,
        description: status.description || "",
        isFinal: status.isFinal,
        icon: status.icon || "ClockOutline"
      };
    };
    const saveUpdateStatus = () => {
      if (editingStatus.value && props.selectedType) {
        appSettingsStore.updateStatusForInquiryType(props.selectedType.inquiry_type, editingStatus.value.id, {
          ...editingStatus.value,
          icon: editingStatus.value.icon?.id || String(editingStatus.value.icon)
        });
        editingStatus.value = null;
      }
    };
    const deleteStatus = (statusId) => {
      if (confirm(translate("agora", "Are you sure you want to delete this status?")) && props.selectedType) {
        appSettingsStore.deleteStatusForInquiryType(props.selectedType.inquiry_type, statusId);
      }
    };
    const moveStatusUp = (statusId) => {
      if (props.selectedType) {
        appSettingsStore.moveStatusUp(props.selectedType.inquiry_type, statusId);
      }
    };
    const moveStatusDown = (statusId) => {
      if (props.selectedType) {
        appSettingsStore.moveStatusDown(props.selectedType.inquiry_type, statusId);
      }
    };
    const cancelEdit = () => {
      editingStatus.value = null;
    };
    const __returned__ = { props, appSettingsStore, editingStatus, newStatus, availableIcons, statuses, getIconComponent, addStatus, editStatus, saveUpdateStatus, deleteStatus, moveStatusUp, moveStatusDown, cancelEdit, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get NcInputField() {
      return NcInputField;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$f = { class: "type-status" };
const _hoisted_2$b = { class: "header" };
const _hoisted_3$6 = {
  key: 0,
  class: "status-management"
};
const _hoisted_4$6 = { class: "description" };
const _hoisted_5$5 = { class: "status-list" };
const _hoisted_6$5 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_7$4 = {
  key: 1,
  class: "status-items"
};
const _hoisted_8$4 = { class: "status-content" };
const _hoisted_9$4 = ["title"];
const _hoisted_10$2 = { class: "status-info" };
const _hoisted_11$2 = { class: "status-key" };
const _hoisted_12$1 = {
  key: 0,
  class: "status-description"
};
const _hoisted_13$1 = { class: "status-properties" };
const _hoisted_14$1 = { class: "status-actions" };
const _hoisted_15$1 = { class: "add-status-form" };
const _hoisted_16$1 = { class: "form-grid" };
const _hoisted_17$1 = { class: "checkbox-field" };
const _hoisted_18 = { class: "field-description" };
const _hoisted_19 = {
  key: 0,
  class: "modal-overlay"
};
const _hoisted_20 = { class: "modal-content" };
const _hoisted_21 = { class: "form-grid" };
const _hoisted_22 = { class: "checkbox-field" };
const _hoisted_23 = { class: "field-description" };
const _hoisted_24 = { class: "modal-actions" };
const _hoisted_25 = {
  key: 1,
  class: "no-selection"
};
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$f, [
    createBaseVNode("div", _hoisted_2$b, [
      createBaseVNode(
        "h2",
        null,
        toDisplayString($setup.t("agora", "Status for {type}", { type: $props.selectedType?.label })),
        1
        /* TEXT */
      )
    ]),
    $props.selectedType ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
      createBaseVNode(
        "p",
        _hoisted_4$6,
        toDisplayString($setup.t("agora", "Manage statuses for this inquiry type Statuses define the workflow stages")),
        1
        /* TEXT */
      ),
      createCommentVNode(" Status list for current inquiry type "),
      createBaseVNode("div", _hoisted_5$5, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.t("agora", "Statuses for {type}", {
            type: $props.selectedType.label
          })),
          1
          /* TEXT */
        ),
        $setup.statuses.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
          createBaseVNode(
            "p",
            null,
            toDisplayString($setup.t("agora", "No statuses configured for this inquiry type")),
            1
            /* TEXT */
          )
        ])) : (openBlock(), createElementBlock("div", _hoisted_7$4, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.statuses, (status, index) => {
              return openBlock(), createElementBlock("div", {
                key: status.statusKey,
                class: "status-item"
              }, [
                createBaseVNode("div", _hoisted_8$4, [
                  createBaseVNode("div", {
                    class: "status-icon",
                    title: status.icon
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent($setup.getIconComponent(status.icon)), { size: 20 }))
                  ], 8, _hoisted_9$4),
                  createBaseVNode("div", _hoisted_10$2, [
                    createBaseVNode(
                      "h4",
                      null,
                      toDisplayString(status.label),
                      1
                      /* TEXT */
                    ),
                    createBaseVNode(
                      "p",
                      _hoisted_11$2,
                      toDisplayString(status.statusKey),
                      1
                      /* TEXT */
                    ),
                    status.description ? (openBlock(), createElementBlock(
                      "p",
                      _hoisted_12$1,
                      toDisplayString(status.description),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    createBaseVNode("div", _hoisted_13$1, [
                      createBaseVNode(
                        "span",
                        {
                          class: normalizeClass(["status-badge", status.isFinal ? "final" : "non-final"])
                        },
                        toDisplayString(status.isFinal ? $setup.t("agora", "Final") : $setup.t("agora", "Non-Final")),
                        3
                        /* TEXT, CLASS */
                      )
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_14$1, [
                  createVNode($setup["NcButton"], {
                    disabled: index === 0,
                    onClick: ($event) => $setup.moveStatusUp(status.statusKey)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.t("agora", "Up")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled", "onClick"]),
                  createVNode($setup["NcButton"], {
                    disabled: index === $setup.statuses.length - 1,
                    onClick: ($event) => $setup.moveStatusDown(status.statusKey)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.t("agora", "Down")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled", "onClick"]),
                  createVNode($setup["NcButton"], {
                    onClick: ($event) => $setup.editStatus(status)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.t("agora", "Edit")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"]),
                  createVNode($setup["NcButton"], {
                    onClick: ($event) => $setup.deleteStatus(status.id)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.t("agora", "Delete")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]))
      ]),
      createCommentVNode(" Add new status form "),
      createBaseVNode("div", _hoisted_15$1, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.t("agora", "Add New Status")),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_16$1, [
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newStatus.statusKey,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.newStatus.statusKey = $event),
            label: $setup.t("agora", "Status Key"),
            placeholder: $setup.t("agora", "Enter unique status key"),
            required: ""
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newStatus.label,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newStatus.label = $event),
            label: $setup.t("agora", "Label"),
            placeholder: $setup.t("agora", "Enter display label"),
            required: ""
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.newStatus.description,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newStatus.description = $event),
            label: $setup.t("agora", "Description"),
            placeholder: $setup.t("agora", "Enter description (optional)"),
            type: "textarea"
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcSelect"], {
            modelValue: $setup.newStatus.icon,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newStatus.icon = $event),
            options: $setup.availableIcons,
            label: "label",
            "input-label": $setup.t("agora", "Select Icon")
          }, null, 8, ["modelValue", "options", "input-label"]),
          createBaseVNode("div", _hoisted_17$1, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.newStatus.isFinal,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newStatus.isFinal = $event),
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Final Status")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_18,
              toDisplayString($setup.t("agora", "Final statuses cannot be changed once set")),
              1
              /* TEXT */
            )
          ]),
          createVNode($setup["NcButton"], {
            type: "primary",
            disabled: !$setup.newStatus.statusKey || !$setup.newStatus.label,
            onClick: $setup.addStatus
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Add Status")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])
        ])
      ]),
      createCommentVNode(" Edit status modal "),
      $setup.editingStatus ? (openBlock(), createElementBlock("div", _hoisted_19, [
        createBaseVNode("div", _hoisted_20, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Edit Status")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_21, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingStatus.statusKey,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.editingStatus.statusKey = $event),
              label: $setup.t("agora", "Status Key"),
              placeholder: $setup.t("agora", "Enter unique status key"),
              required: ""
            }, null, 8, ["modelValue", "label", "placeholder"]),
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingStatus.label,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.editingStatus.label = $event),
              label: $setup.t("agora", "Label"),
              placeholder: $setup.t("agora", "Enter display label"),
              required: ""
            }, null, 8, ["modelValue", "label", "placeholder"]),
            createVNode($setup["NcInputField"], {
              modelValue: $setup.editingStatus.description,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.editingStatus.description = $event),
              label: $setup.t("agora", "Description"),
              placeholder: $setup.t("agora", "Enter description (optional)"),
              type: "textarea"
            }, null, 8, ["modelValue", "label", "placeholder"]),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.editingStatus.icon,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.editingStatus.icon = $event),
              options: $setup.availableIcons,
              label: "label",
              "input-label": $setup.t("agora", "Select Icon")
            }, null, 8, ["modelValue", "options", "input-label"]),
            createBaseVNode("div", _hoisted_22, [
              createVNode($setup["NcCheckboxRadioSwitch"], {
                modelValue: $setup.editingStatus.isFinal,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.editingStatus.isFinal = $event),
                type: "switch"
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.t("agora", "Final Status")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"]),
              createBaseVNode(
                "p",
                _hoisted_23,
                toDisplayString($setup.t("agora", "Final statuses cannot be changed once set")),
                1
                /* TEXT */
              )
            ])
          ]),
          createBaseVNode("div", _hoisted_24, [
            createVNode($setup["NcButton"], { onClick: $setup.cancelEdit }, {
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
              disabled: !$setup.editingStatus.statusKey || !$setup.editingStatus.label,
              onClick: $setup.saveUpdateStatus
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Save Changes")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["disabled"])
          ])
        ])
      ])) : createCommentVNode("v-if", true)
    ])) : (openBlock(), createElementBlock("div", _hoisted_25, [
      createBaseVNode(
        "p",
        null,
        toDisplayString($setup.t("agora", "No type selected")),
        1
        /* TEXT */
      )
    ]))
  ]);
}
const AdminTypeStatus = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-832d89d2"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminTypeStatus.vue"]]);
const _sfc_main$e = {
  __name: "TypeSettingsModal",
  props: {
    selectedType: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const props = __props;
    const activeSettingsTab = ref("user-rights");
    const getIconComponent = (iconName) => InquiryGeneralIcons[iconName] || InquiryGeneralIcons.default;
    const settingsTabs = [
      {
        id: "user-rights",
        label: translate("agora", "Inquiry Features"),
        component: AdminTypeRights
      },
      {
        id: "status",
        label: translate("agora", "Inquiry Status"),
        component: AdminTypeStatus
      }
    ];
    const updateTypeRights = (typeKey, rights) => {
      appSettingsStore.inquiryTypeRights[typeKey] = rights;
      appSettingsStore.write();
    };
    const __returned__ = { appSettingsStore, props, activeSettingsTab, getIconComponent, settingsTabs, updateTypeRights, ref, get t() {
      return translate;
    }, AdminTypeRights, AdminTypeStatus, get InquiryGeneralIcons() {
      return InquiryGeneralIcons;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$e = { class: "type-settings-modal" };
const _hoisted_2$a = { class: "modal-header" };
const _hoisted_3$5 = { class: "type-info" };
const _hoisted_4$5 = { class: "type-icon" };
const _hoisted_5$4 = { class: "type-details" };
const _hoisted_6$4 = { class: "type-key" };
const _hoisted_7$3 = { class: "simple-menu" };
const _hoisted_8$3 = ["onClick"];
const _hoisted_9$3 = { class: "settings-content" };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    createBaseVNode("div", _hoisted_2$a, [
      createBaseVNode("div", _hoisted_3$5, [
        createBaseVNode("div", _hoisted_4$5, [
          (openBlock(), createBlock(resolveDynamicComponent($setup.getIconComponent($setup.props.selectedType.icon)), { size: 20 }))
        ]),
        createBaseVNode("div", _hoisted_5$4, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.props.selectedType.label),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "p",
            _hoisted_6$4,
            toDisplayString($setup.props.selectedType.inquiry_type),
            1
            /* TEXT */
          )
        ])
      ]),
      createBaseVNode(
        "button",
        {
          class: "close-button",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
        },
        toDisplayString($setup.t("agora", "Close")),
        1
        /* TEXT */
      )
    ]),
    createBaseVNode("div", _hoisted_7$3, [
      (openBlock(), createElementBlock(
        Fragment,
        null,
        renderList($setup.settingsTabs, (tab) => {
          return createBaseVNode("button", {
            key: tab.id,
            class: normalizeClass(["menu-item", { active: $setup.activeSettingsTab === tab.id }]),
            onClick: ($event) => $setup.activeSettingsTab = tab.id
          }, toDisplayString(tab.label), 11, _hoisted_8$3);
        }),
        64
        /* STABLE_FRAGMENT */
      ))
    ]),
    createBaseVNode("div", _hoisted_9$3, [
      (openBlock(), createBlock(resolveDynamicComponent($setup.settingsTabs.find((t) => t.id === $setup.activeSettingsTab)?.component), {
        "selected-type": $setup.props.selectedType,
        onUpdateRights: $setup.updateTypeRights
      }, null, 40, ["selected-type"]))
    ])
  ]);
}
const TypeSettingsModal = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-077dce28"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/TypeSettingsModal.vue"]]);
const _sfc_main$d = {
  __name: "AdminSettings",
  setup(__props, { expose: __expose }) {
    __expose();
    const currentView = ref("families");
    const selectedFamily = ref(null);
    const selectedType = ref(null);
    const settingsModalOpen = ref(false);
    const breadcrumb = computed(() => {
      const items = [
        { label: translate("agora", "Inquiry Families"), view: "families" }
      ];
      if (selectedFamily.value) {
        items.push({
          label: selectedFamily.value.label,
          view: "types"
        });
      }
      return items;
    });
    const handleFamilySelected = (family) => {
      selectedFamily.value = family;
      currentView.value = "types";
    };
    const handleTypeSelected = (type) => {
      selectedType.value = type;
      settingsModalOpen.value = true;
    };
    const handleBreadcrumbClick = (view) => {
      if (view === "families") {
        selectedFamily.value = null;
        selectedType.value = null;
      }
      currentView.value = view;
    };
    const handleSettingsModalClose = () => {
      settingsModalOpen.value = false;
      selectedType.value = null;
    };
    const currentComponent = computed(() => {
      switch (currentView.value) {
        case "types":
          return AdminTypesManager;
        case "families":
        default:
          return AdminFamiliesManager;
      }
    });
    const __returned__ = { currentView, selectedFamily, selectedType, settingsModalOpen, breadcrumb, handleFamilySelected, handleTypeSelected, handleBreadcrumbClick, handleSettingsModalClose, currentComponent, ref, computed, get t() {
      return translate;
    }, get NcAppSettingsDialog() {
      return NcAppSettingsDialog;
    }, AdminFamiliesManager, AdminTypesManager, TypeSettingsModal };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$d = { class: "admin-settings-container" };
const _hoisted_2$9 = {
  key: 0,
  class: "breadcrumb"
};
const _hoisted_3$4 = ["onClick"];
const _hoisted_4$4 = {
  key: 1,
  class: "breadcrumb-current"
};
const _hoisted_5$3 = {
  key: 2,
  class: "breadcrumb-separator"
};
const _hoisted_6$3 = { class: "settings-content" };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$d, [
    createCommentVNode(" Breadcrumb Navigation "),
    $setup.breadcrumb.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$9, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.breadcrumb, (item, index) => {
          return openBlock(), createElementBlock("span", {
            key: item.view,
            class: "breadcrumb-item"
          }, [
            index < $setup.breadcrumb.length - 1 ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "breadcrumb-link",
              onClick: ($event) => $setup.handleBreadcrumbClick(item.view)
            }, toDisplayString(item.label), 9, _hoisted_3$4)) : (openBlock(), createElementBlock(
              "span",
              _hoisted_4$4,
              toDisplayString(item.label),
              1
              /* TEXT */
            )),
            index < $setup.breadcrumb.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_5$3, " / ")) : createCommentVNode("v-if", true)
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ])) : createCommentVNode("v-if", true),
    createCommentVNode(" Main Content "),
    createBaseVNode("div", _hoisted_6$3, [
      (openBlock(), createBlock(resolveDynamicComponent($setup.currentComponent), {
        "selected-family": $setup.selectedFamily,
        onFamilySelected: $setup.handleFamilySelected,
        onTypeSelected: $setup.handleTypeSelected,
        onBackToFamilies: _cache[0] || (_cache[0] = ($event) => $setup.handleBreadcrumbClick("families"))
      }, null, 40, ["selected-family"]))
    ]),
    createVNode($setup["NcAppSettingsDialog"], {
      open: $setup.settingsModalOpen,
      "onUpdate:open": _cache[1] || (_cache[1] = ($event) => $setup.settingsModalOpen = $event),
      "show-navigation": false,
      name: $setup.t("agora", "Settings - {type}", { type: $setup.selectedType?.label || "" }),
      class: "large-modal",
      onClose: $setup.handleSettingsModalClose
    }, {
      default: withCtx(() => [
        $setup.selectedType ? (openBlock(), createBlock($setup["TypeSettingsModal"], {
          key: 0,
          "selected-type": $setup.selectedType,
          onClose: $setup.handleSettingsModalClose
        }, null, 8, ["selected-type"])) : createCommentVNode("v-if", true)
      ]),
      _: 1
      /* STABLE */
    }, 8, ["open", "name"])
  ]);
}
const AdminSettings = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-cd782848"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminSettings.vue"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "AdminPerformance",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const updateTypeOptions = [
      {
        value: "longInquirying",
        label: translate("agora", 'Enable "long inquirying" for instant updates')
      },
      {
        value: "periodicInquirying",
        label: translate("agora", "Enable periodic requests of inquiry updates from the client")
      },
      {
        value: "noInquirying",
        label: translate("agora", "Disable automatic updates (inquiry must be reloaded to get updates)")
      }
    ];
    const __returned__ = { appSettingsStore, updateTypeOptions, get RadioGroupDiv() {
      return RadioGroupDiv;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$c = { class: "user_settings" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$c, [
    createVNode($setup["RadioGroupDiv"], {
      modelValue: $setup.appSettingsStore.updateType,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.updateType = $event),
      options: $setup.updateTypeOptions,
      onUpdate: _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
    }, null, 8, ["modelValue"])
  ]);
}
const AdminPerformance = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminPerformance.vue"]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "TreeItem",
  props: {
    item: {
      type: Object,
      default: () => ({ id: 0, name: "" })
    },
    items: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "default"
    }
  },
  emits: ["edit", "delete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const children = computed(() => props.items.filter((i) => i.parentId === props.item.id));
    const editItem = () => {
      emit("edit", props.item, props.type);
    };
    const deleteItem = () => {
      emit("delete", props.item.id, props.type);
    };
    const __returned__ = { props, emit, children, editItem, deleteItem, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$b = { class: "tree-item" };
const _hoisted_2$8 = { class: "tree-label" };
const _hoisted_3$3 = { class: "tree-actions" };
const _hoisted_4$3 = {
  key: 0,
  class: "tree-children"
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TreeItem = resolveComponent("TreeItem", true);
  return openBlock(), createElementBlock("div", _hoisted_1$b, [
    createBaseVNode(
      "div",
      {
        class: "tree-node",
        style: normalizeStyle("margin-left: " + $props.level * 20 + "px")
      },
      [
        createBaseVNode(
          "span",
          _hoisted_2$8,
          toDisplayString($props.item.name),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_3$3, [
          createVNode($setup["NcButton"], { onClick: $setup.editItem }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Edit")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode($setup["NcButton"], { onClick: $setup.deleteItem }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Delete")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ],
      4
      /* STYLE */
    ),
    $setup.children.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.children, (child) => {
          return openBlock(), createBlock(_component_TreeItem, {
            key: child.id,
            item: child,
            items: $props.items,
            level: $props.level + 1,
            type: $props.type,
            onEdit: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("edit", $event, $props.type)),
            onDelete: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("delete", $event, $props.type))
          }, null, 8, ["item", "items", "level", "type"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ])) : createCommentVNode("v-if", true)
  ]);
}
const TreeItem = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-37a5142a"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/TreeItem.vue"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AdminCategoryLocation",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const selectedCategory = ref({ value: 0, label: translate("agora", "No parent") });
    const selectedLocation = ref({ value: 0, label: translate("agora", "No parent") });
    const categories = computed(() => appSettingsStore.categoryTab || []);
    const locations = computed(() => appSettingsStore.locationTab || []);
    const newCategory = ref({ name: "", parentId: 0 });
    const newLocation = ref({ name: "", parentId: 0 });
    const editingItem = ref(null);
    const activeTab = ref("categories");
    const isLoaded = ref(false);
    onMounted(() => {
      isLoaded.value = true;
    });
    const hierarchicalCategory = computed(() => {
      if (!Array.isArray(appSettingsStore.categoryTab)) return [];
      const categoriesList = buildHierarchy(appSettingsStore.categoryTab).map((item) => ({
        value: item.id,
        label: `${"— ".repeat(item.depth ?? 0)}${item.name ?? "[no name]"}`,
        original: item
      }));
      return [{ value: 0, label: translate("agora", "No parent") }, ...categoriesList];
    });
    const hierarchicalLocation = computed(() => {
      if (!Array.isArray(appSettingsStore.locationTab)) return [];
      const locationsList = buildHierarchy(appSettingsStore.locationTab).map((item) => ({
        value: item.id,
        label: `${"— ".repeat(item.depth ?? 0)}${item.name ?? "[no name]"}`,
        original: item
      }));
      return [{ value: 0, label: translate("agora", "No parent") }, ...locationsList];
    });
    function buildHierarchy(list, parentId = 0, depth = 0) {
      if (!Array.isArray(list)) return [];
      return list.filter((item) => item?.parentId === parentId).map((item) => {
        const children = buildHierarchy(list, item.id, depth + 1);
        return {
          ...item,
          depth,
          children
        };
      }).flatMap((item) => [item, ...item.children]);
    }
    const editingOptions = computed(() => {
      if (!editingItem.value) return [];
      if (editingItem.value.type === "category") {
        return hierarchicalCategory.value.filter((opt) => opt.value !== editingItem.value.id);
      }
      return hierarchicalLocation.value.filter((opt) => opt.value !== editingItem.value.id);
    });
    const addCategory = () => {
      if (newCategory.value.name.trim()) {
        const parentId = selectedCategory.value?.value || 0;
        appSettingsStore.addCategory(newCategory.value.name, parentId);
        newCategory.value.name = "";
        selectedCategory.value = { value: 0, label: translate("agora", "No parent") };
      }
    };
    const addLocation = () => {
      if (newLocation.value.name.trim()) {
        const parentId = selectedLocation.value?.value || 0;
        appSettingsStore.addLocation(newLocation.value.name, parentId);
        newLocation.value.name = "";
        selectedLocation.value = { value: 0, label: translate("agora", "No parent") };
      }
    };
    const editingParent = computed({
      get: () => {
        if (!editingItem.value) return { value: 0, label: translate("agora", "No parent") };
        const parentId = editingItem.value.parentId || 0;
        if (editingItem.value.type === "category") {
          return hierarchicalCategory.value.find((opt) => opt.value === parentId) || {
            value: 0,
            label: translate("agora", "No parent")
          };
        }
        return hierarchicalLocation.value.find((opt) => opt.value === parentId) || {
          value: 0,
          label: translate("agora", "No parent")
        };
      },
      set: (selectedOption) => {
        if (editingItem.value && selectedOption) {
          editingItem.value.parentId = Number(selectedOption.value) || 0;
        }
      }
    });
    const editItem = (item, type) => {
      editingItem.value = {
        ...item,
        type,
        parentId: item.parentId || 0
      };
    };
    const saveEdit = () => {
      if (editingItem.value) {
        if (editingItem.value.type === "category") {
          appSettingsStore.updateCategory(
            editingItem.value.id,
            editingItem.value.name,
            editingItem.value.parentId
          );
        } else {
          appSettingsStore.updateLocation(
            editingItem.value.id,
            editingItem.value.name,
            editingItem.value.parentId
          );
        }
        editingItem.value = null;
      }
    };
    const deleteItem = (id, type) => {
      if (confirm(translate("agora", "Are you sure you want to delete this item?"))) {
        try {
          if (type === "category") {
            appSettingsStore.deleteCategory(id);
          } else {
            appSettingsStore.deleteLocation(id);
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          alert(translate("agora", "Error deleting item"));
        }
      }
    };
    const rootCategories = computed(() => categories.value.filter((item) => item.parentId === 0));
    const rootLocations = computed(() => locations.value.filter((item) => item.parentId === 0));
    const __returned__ = { appSettingsStore, selectedCategory, selectedLocation, categories, locations, newCategory, newLocation, editingItem, activeTab, isLoaded, hierarchicalCategory, hierarchicalLocation, buildHierarchy, editingOptions, addCategory, addLocation, editingParent, editItem, saveEdit, deleteItem, rootCategories, rootLocations, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get NcInputField() {
      return NcInputField;
    }, get NcSelect() {
      return NcSelect;
    }, TreeItem };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$a = { class: "category-location-manager" };
const _hoisted_2$7 = {
  key: 0,
  class: "loading"
};
const _hoisted_3$2 = { key: 1 };
const _hoisted_4$2 = { class: "tabs" };
const _hoisted_5$2 = {
  key: 0,
  class: "tab-content"
};
const _hoisted_6$2 = { class: "add-form" };
const _hoisted_7$2 = { class: "form-fields" };
const _hoisted_8$2 = { class: "tree-view" };
const _hoisted_9$2 = { class: "tree-container" };
const _hoisted_10$1 = {
  key: 1,
  class: "tab-content"
};
const _hoisted_11$1 = { class: "add-form" };
const _hoisted_12 = { class: "form-fields" };
const _hoisted_13 = { class: "tree-view" };
const _hoisted_14 = { class: "tree-container" };
const _hoisted_15 = {
  key: 2,
  class: "modal"
};
const _hoisted_16 = { class: "modal-content" };
const _hoisted_17 = { class: "modal-actions" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$a, [
    !$setup.isLoaded ? (openBlock(), createElementBlock(
      "div",
      _hoisted_2$7,
      toDisplayString($setup.t("agora", "Loading categories and locations")),
      1
      /* TEXT */
    )) : (openBlock(), createElementBlock("div", _hoisted_3$2, [
      createBaseVNode("div", _hoisted_4$2, [
        createVNode($setup["NcButton"], {
          class: normalizeClass({ active: $setup.activeTab === "categories" }),
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.activeTab = "categories")
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Categories")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["class"]),
        createVNode($setup["NcButton"], {
          class: normalizeClass({ active: $setup.activeTab === "locations" }),
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.activeTab = "locations")
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Locations")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["class"])
      ]),
      $setup.activeTab === "categories" ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
        createBaseVNode("div", _hoisted_6$2, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Add New Category")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_7$2, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.newCategory.name,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newCategory.name = $event),
              label: $setup.t("agora", "Category Name"),
              placeholder: $setup.t("agora", "Enter category name")
            }, null, 8, ["modelValue", "label", "placeholder"]),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.selectedCategory,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.selectedCategory = $event),
              options: $setup.hierarchicalCategory,
              clearable: false,
              placeholder: $setup.t("agora", "Select parent category")
            }, null, 8, ["modelValue", "options", "placeholder"]),
            createVNode($setup["NcButton"], {
              type: "primary",
              disabled: !$setup.newCategory.name.trim(),
              onClick: $setup.addCategory
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Add Category")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["disabled"])
          ])
        ]),
        createBaseVNode("div", _hoisted_8$2, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Categories Tree")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_9$2, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList($setup.rootCategories, (item) => {
                return openBlock(), createBlock($setup["TreeItem"], {
                  key: "cat-" + item.id,
                  item,
                  items: $setup.categories,
                  level: 0,
                  type: "category",
                  onEdit: $setup.editItem,
                  onDelete: $setup.deleteItem
                }, null, 8, ["item", "items"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])) : createCommentVNode("v-if", true),
      $setup.activeTab === "locations" ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
        createBaseVNode("div", _hoisted_11$1, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Add New Location")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_12, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.newLocation.name,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newLocation.name = $event),
              label: $setup.t("agora", "Location Name"),
              placeholder: $setup.t("agora", "Enter location name")
            }, null, 8, ["modelValue", "label", "placeholder"]),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.selectedLocation,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.selectedLocation = $event),
              options: $setup.hierarchicalLocation,
              clearable: false,
              placeholder: $setup.t("agora", "Select parent location")
            }, null, 8, ["modelValue", "options", "placeholder"]),
            createVNode($setup["NcButton"], {
              type: "primary",
              disabled: !$setup.newLocation.name.trim(),
              onClick: $setup.addLocation
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Add Location")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["disabled"])
          ])
        ]),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Locations Tree")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_14, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList($setup.rootLocations, (item) => {
                return openBlock(), createBlock($setup["TreeItem"], {
                  key: "loc-" + item.id,
                  item,
                  items: $setup.locations,
                  level: 0,
                  type: "location",
                  onEdit: $setup.editItem,
                  onDelete: $setup.deleteItem
                }, null, 8, ["item", "items"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])) : createCommentVNode("v-if", true),
      createCommentVNode(" Modal d'édition "),
      $setup.editingItem ? (openBlock(), createElementBlock("div", _hoisted_15, [
        createBaseVNode("div", _hoisted_16, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Edit")) + " " + toDisplayString($setup.editingItem.type === "category" ? $setup.t("agora", "Category") : $setup.t("agora", "Location")),
            1
            /* TEXT */
          ),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.editingItem.name,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.editingItem.name = $event),
            label: $setup.editingItem.type === "category" ? $setup.t("agora", "Category Name") : $setup.t("agora", "Location Name")
          }, null, 8, ["modelValue", "label"]),
          createVNode($setup["NcSelect"], {
            modelValue: $setup.editingParent,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.editingParent = $event),
            options: $setup.editingOptions,
            clearable: false,
            placeholder: $setup.t("agora", "Select parent")
          }, null, 8, ["modelValue", "options", "placeholder"]),
          createBaseVNode("div", _hoisted_17, [
            createVNode($setup["NcButton"], {
              onClick: _cache[8] || (_cache[8] = ($event) => $setup.editingItem = null)
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
              onClick: $setup.saveEdit
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Save")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ])
      ])) : createCommentVNode("v-if", true)
    ]))
  ]);
}
const AdminCategoryLocation = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-da2e3bfe"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminCategoryLocation.vue"]]);
const _sfc_main$9 = {
  __name: "AdminModeratorRights",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$9 = { class: "rights-management" };
const _hoisted_2$6 = { class: "description" };
const _hoisted_3$1 = { class: "rights-list" };
const _hoisted_4$1 = { class: "right-item" };
const _hoisted_5$1 = { class: "right-description" };
const _hoisted_6$1 = { class: "right-item" };
const _hoisted_7$1 = { class: "right-description" };
const _hoisted_8$1 = { class: "right-item" };
const _hoisted_9$1 = { class: "right-description" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    createBaseVNode(
      "h2",
      null,
      toDisplayString($setup.t("agora", "Moderator Rights")),
      1
      /* TEXT */
    ),
    createBaseVNode(
      "p",
      _hoisted_2$6,
      toDisplayString($setup.t("agora", "Define permissions for users with moderator role")),
      1
      /* TEXT */
    ),
    createBaseVNode("div", _hoisted_3$1, [
      createBaseVNode("div", _hoisted_4$1, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.moderatorRights.modifyInquiry,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.moderatorRights.modifyInquiry = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Modify inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_5$1,
          toDisplayString($setup.t("agora", "Allow moderators to modify existing inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_6$1, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.moderatorRights.deleteInquiry,
          "onUpdate:modelValue": [
            _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.moderatorRights.deleteInquiry = $event),
            _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Delete inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_7$1,
          toDisplayString($setup.t("agora", "Allow moderators to delete inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_8$1, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.moderatorRights.archiveInquiry,
          "onUpdate:modelValue": [
            _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.moderatorRights.archiveInquiry = $event),
            _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Archive inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_9$1,
          toDisplayString($setup.t("agora", "Allow moderators to archive inquiries")),
          1
          /* TEXT */
        )
      ])
    ])
  ]);
}
const AdminModeratorRights = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-fb7cbc5e"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminModeratorRights.vue"]]);
const _sfc_main$8 = {
  __name: "AdminOfficialRights",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$8 = { class: "rights-management" };
const _hoisted_2$5 = { class: "description" };
const _hoisted_3 = { class: "rights-list" };
const _hoisted_4 = { class: "right-item" };
const _hoisted_5 = { class: "right-description" };
const _hoisted_6 = { class: "right-item" };
const _hoisted_7 = { class: "right-description" };
const _hoisted_8 = { class: "right-item" };
const _hoisted_9 = { class: "right-description" };
const _hoisted_10 = { class: "right-item" };
const _hoisted_11 = { class: "right-description" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    createBaseVNode(
      "h2",
      null,
      toDisplayString($setup.t("agora", "Official Rights")),
      1
      /* TEXT */
    ),
    createBaseVNode(
      "p",
      _hoisted_2$5,
      toDisplayString($setup.t("agora", "Define permissions for users with official role")),
      1
      /* TEXT */
    ),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("div", _hoisted_4, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.modifyInquiry,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.officialRights.modifyInquiry = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Modify inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_5,
          toDisplayString($setup.t("agora", "Allow officials to modify existing inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_6, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.deleteInquiry,
          "onUpdate:modelValue": [
            _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.officialRights.deleteInquiry = $event),
            _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Delete inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_7,
          toDisplayString($setup.t("agora", "Allow officials to delete inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_8, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.archiveInquiry,
          "onUpdate:modelValue": [
            _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.officialRights.archiveInquiry = $event),
            _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Archive inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_9,
          toDisplayString($setup.t("agora", "Allow officials to archive inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_10, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.manageModerationStatus,
          "onUpdate:modelValue": [
            _cache[6] || (_cache[6] = ($event) => $setup.appSettingsStore.officialRights.manageModerationStatus = $event),
            _cache[7] || (_cache[7] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Moderation status")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_11,
          toDisplayString($setup.t("agora", "Allow officials to manage Moderation status for all inquiry")),
          1
          /* TEXT */
        )
      ])
    ])
  ]);
}
const AdminOfficialRights = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-14c25bb2"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminOfficialRights.vue"]]);
const _sfc_main$7 = {
  __name: "AdminInquiryCreation",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$7 = { class: "user_settings" };
const _hoisted_2$4 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.allowInquiryCreation,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.allowInquiryCreation = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the inquiry creation globally")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.allowInquiryCreation ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.inquiryCreationGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.inquiryCreationGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminInquiryCreation = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminInquiryCreation.vue"]]);
const _sfc_main$6 = {
  __name: "AdminInquiriesInNavigation",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$6 = { class: "user_settings" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.navigationInquiriesInList,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.navigationInquiriesInList = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Load inquiries into the navigation")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"])
  ]);
}
const AdminInquiriesInNavigation = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminInquiriesInNavigation.vue"]]);
const _sfc_main$5 = {
  __name: "AdminShareOpenInquiry",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$5 = { class: "user_settings" };
const _hoisted_2$3 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.allowAllAccess,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.allowAllAccess = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the shares of inquiries globally, by default admin and moderator have rights")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.allowAllAccess ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.allAccessGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.allAccessGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminShareOpenInquiry = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminShareOpenInquiry.vue"]]);
const _sfc_main$4 = {
  __name: "AdminSharePublicCreate",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$4 = { class: "user_settings" };
const _hoisted_2$2 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.allowPublicShares,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.allowPublicShares = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable public shares of inquiries globally")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.allowPublicShares ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.publicSharesGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.publicSharesGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminSharePublicCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminSharePublicCreate.vue"]]);
const _sfc_main$3 = {
  __name: "AdminSharePublicShowLogin",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$3 = { class: "user_settings" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.showLogin,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.showLogin = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("inquiries", "Enable the login option in the registration dialog of public inquiries")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"])
  ]);
}
const AdminSharePublicShowLogin = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminSharePublicShowLogin.vue"]]);
const _sfc_main$2 = {
  __name: "AdminShowMailAddresses",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$2 = { class: "user_settings" };
const _hoisted_2$1 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.showMailAddresses,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.showMailAddresses = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Show email addresses of internal accounts")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.showMailAddresses ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.showMailAddressesGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.showMailAddressesGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Show only to members of the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminShowMailAddresses = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminShowMailAddresses.vue"]]);
const _sfc_main$1 = {
  __name: "AdminUnrescrictedOwners",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, CardDiv };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { class: "user_settings" };
const _hoisted_2 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.unrestrictedOwner,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.unrestrictedOwner = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable unrestricted owners globally")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.unrestrictedOwner ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.unrestrictedOwnerGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.unrestrictedOwnerGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: $setup.appSettingsStore.status.loadingGroups,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true),
    createVNode($setup["CardDiv"], { type: "info" }, {
      default: withCtx(() => [
        createBaseVNode(
          "p",
          null,
          toDisplayString($setup.t("agora", "Effects on restricted owners")),
          1
          /* TEXT */
        ),
        createBaseVNode("ul", null, [
          createBaseVNode(
            "li",
            null,
            toDisplayString($setup.t(
              "agora",
              "Anonymizing a inquiry of a restricted owner means that this inquiry is anonymous for everyone, including the owner."
            )),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "li",
            null,
            toDisplayString($setup.t("agora", "Deleting and changing inquiries of participants is not possible")),
            1
            /* TEXT */
          )
        ])
      ]),
      _: 1
      /* STABLE */
    })
  ]);
}
const AdminUnrescrictedOwners = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminUnrescrictedOwners.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminSettingsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const wizardStore = useTemplateWizardStore();
    const isLoaded = ref(false);
    const launchWizard = () => {
      wizardStore.openWizard();
    };
    const sections = {
      templateSetup: {
        name: translate("agora", "Template Setup Wizard"),
        description: translate("agora", "Configure your Agora instance using pre-built templates")
      },
      inquiryCategoryLocation: {
        name: translate("agora", "Categories and Locations Management"),
        description: translate("agora", "Change globally location and category (for all accounts)")
      },
      inquirySettings: {
        name: translate("agora", "Inquiry settings"),
        description: translate("agora", "Change inquiry settings globally (for all accounts)")
      },
      shareSettings: {
        name: translate("agora", "Share settings"),
        description: translate("agora", "Change share settings globally (for all accounts)")
      },
      otherSettings: {
        name: translate("agora", "Other settings"),
        description: translate("agora", "Enable or disable individual features")
      },
      performanceSettings: {
        name: translate("agora", "Performance settings"),
        description: translate(
          "agora",
          "If you are experiencing connection problems, change how auto updates are retrieved."
        )
      },
      globalSettings: {
        name: translate("agora", "Global inquiry settings"),
        description: translate(
          "agora",
          "Let you configure, family, type of inquiries and associed rights, like comment, supports, status..."
        )
      },
      publicSettings: {
        name: translate("agora", "Public inquiry registration dialog options"),
        description: translate(
          "agora",
          "These options regard the appearence of the registration dialog of public inquiries."
        )
      },
      emailSettings: {
        name: translate("agora", "Email options"),
        description: translate(
          "agora",
          "Add links to legal terms, if they exist and add an optional disclaimer to emails."
        )
      },
      inquiryRights: {
        name: translate("agora", "Inquiry rights"),
        description: translate("agora", "Change inquiry rights globally (for all accounts)")
      },
      moderationSettings: {
        name: translate("agora", "Moderation settings"),
        description: translate("agora", "Change moderation settings")
      },
      jobSettings: {
        name: translate("agora", "Job control"),
        description: translate("agora", "Manually start backgropund jobs independent from the cron schedule")
      }
    };
    onMounted(async () => {
      try {
        await appSettingsStore.load();
        await wizardStore.checkDatabaseEmpty();
        if (wizardStore.isDatabaseEmpty) {
          wizardStore.openWizard();
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        isLoaded.value = true;
      }
    });
    const __returned__ = { appSettingsStore, wizardStore, isLoaded, launchWizard, sections, get t() {
      return translate;
    }, get NcSettingsSection() {
      return NcSettingsSection;
    }, get NcButton() {
      return NcButton;
    }, get FlexSettings() {
      return FlexSettings;
    }, TemplateSetupWizard, get AdminActivities() {
      return AdminActivities;
    }, get AdminArchiveInquiries() {
      return AdminArchiveInquiries;
    }, get AdminExpireInquiries() {
      return AdminExpireInquiries;
    }, get AdminDeleteInquiries() {
      return AdminDeleteInquiries;
    }, get AdminEmail() {
      return AdminEmail;
    }, get AdminModeration() {
      return AdminModeration;
    }, get AdminJobs() {
      return AdminJobs;
    }, get AdminLegal() {
      return AdminLegal;
    }, get AdminSettings() {
      return AdminSettings;
    }, get AdminModeratorRights() {
      return AdminModeratorRights;
    }, get AdminOfficialRights() {
      return AdminOfficialRights;
    }, get AdminCategoryLocation() {
      return AdminCategoryLocation;
    }, get AdminPerformance() {
      return AdminPerformance;
    }, get AdminInquiryCreation() {
      return AdminInquiryCreation;
    }, get AdminInquiriesInNavigation() {
      return AdminInquiriesInNavigation;
    }, get AdminShareOpenInquiry() {
      return AdminShareOpenInquiry;
    }, get AdminSharePublicCreate() {
      return AdminSharePublicCreate;
    }, get AdminSharePublicShowLogin() {
      return AdminSharePublicShowLogin;
    }, get AdminShowMailAddresses() {
      return AdminShowMailAddresses;
    }, get AdminUnrescrictedOwners() {
      return AdminUnrescrictedOwners;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.isLoaded ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createCommentVNode(" Template Setup Wizard "),
    createVNode($setup["TemplateSetupWizard"]),
    createVNode($setup["FlexSettings"], null, {
      default: withCtx(() => [
        createVNode($setup["NcSettingsSection"], null, {
          default: withCtx(() => [
            createCommentVNode(" Template Setup Wizard Section "),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.templateSetup)),
              {
                default: withCtx(() => [
                  createBaseVNode(
                    "p",
                    null,
                    toDisplayString($setup.t("agora", "Use the setup wizard to quickly configure your Agora instance with pre-built templates for citizen participation, enterprise, or education use cases.")),
                    1
                    /* TEXT */
                  ),
                  createVNode($setup["NcButton"], {
                    type: "primary",
                    onClick: $setup.launchWizard
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.t("agora", "Launch Setup Wizard")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.globalSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminSettings"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.inquirySettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminInquiryCreation"]),
                  createVNode($setup["AdminUnrescrictedOwners"]),
                  createVNode($setup["AdminExpireInquiries"]),
                  createVNode($setup["AdminArchiveInquiries"]),
                  createVNode($setup["AdminDeleteInquiries"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.shareSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminShareOpenInquiry"]),
                  createVNode($setup["AdminSharePublicCreate"]),
                  createVNode($setup["AdminSharePublicShowLogin"]),
                  createVNode($setup["AdminLegal"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.otherSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminActivities"]),
                  createVNode($setup["AdminShowMailAddresses"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 1
          /* STABLE */
        }),
        createVNode($setup["NcSettingsSection"], null, {
          default: withCtx(() => [
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.inquiryCategoryLocation)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminCategoryLocation"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.moderationSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminModeration"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.inquiryRights)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminModeratorRights"]),
                  createVNode($setup["AdminOfficialRights"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.emailSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminEmail"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.performanceSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminPerformance"]),
                  createVNode($setup["AdminInquiriesInNavigation"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.jobSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminJobs"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      _: 1
      /* STABLE */
    })
  ])) : createCommentVNode("v-if", true);
}
const AdminSettingsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/views/AdminSettingsPage.vue"]]);
const Agora = createApp(AdminSettingsPage).use(pinia);
Agora.mount("#content_agora");
//# sourceMappingURL=agora-adminSettings.mjs.map
