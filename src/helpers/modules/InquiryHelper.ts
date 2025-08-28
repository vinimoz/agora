/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { InquiryIcons } from '../../utils/icons';
import { t } from '@nextcloud/l10n';


export async function confirmAction(
  message: string,
): Promise<boolean> {
  return Promise.resolve(window.confirm(message));
}

export const InquiryTypesUI = {
  proposal: {
    label: t('agora', 'Proposal'),
    icon: InquiryIcons.proposal
  },
  debate: {
    label: 'Debate',
    icon: InquiryIcons.debate
  },
  petition: {
    label: 'Petition',
    icon: InquiryIcons.petition
  },
  project: {
    label: 'Project',
    icon: InquiryIcons.project
  },
  grievance: {
    label: 'Grievance',
    icon: InquiryIcons.grievance
  },
  suggestion: {
    label: 'Suggestion',
    icon: InquiryIcons.suggestion
  },
  official: {
    label: 'Official Response',
    icon: InquiryIcons.official
  }
};

export const InquiryTypeRights = {
  proposal: {
    settings: {
      supportInquiry: true,
      commentInquiry: true,
      attachFileInquiry: true,
      editorType: 'wysiwyg'
    }
  },
  debate: {
    settings: {
      supportInquiry: true,
      commentInquiry: true,
      attachFileInquiry: true,
      editorType: 'texteditor'
    }
  },
  petition: {
    settings: {
      supportInquiry: true,
      commentInquiry: true,
      attachFileInquiry: true,
      editorType: 'wysiwyg'
    }
  },
  project: {
    settings: {
      supportInquiry: true,
      commentInquiry: true,
      attachFileInquiry: true,
      editorType: 'texteditor'
    }
  },
  grievance: {
    settings: {
      supportInquiry: true,
      commentInquiry: true,
      attachFileInquiry: true,
      editorType: 'wysiwyg'
    }
  },
  suggestion: {
    settings: {
      supportInquiry: true,
      commentInquiry: false,
      attachFileInquiry: false,
      editorType: 'textarea'
    }
  },
  official: {
    settings: {
      supportInquiry: false,
      commentInquiry: false,
      attachFileInquiry: false,
      editorType: 'textarea'
    }
  }
};

export const InquiryTypeValues = {
  PROPOSAL: 'proposal',
  PROJECT: 'project',
  GRIEVANCE: 'grievance',
  DEBATE: 'debate',
  PETITION: 'petition',
  SUGGESTION: 'suggestion',
  OFFICIAL: 'official'
} as const;
