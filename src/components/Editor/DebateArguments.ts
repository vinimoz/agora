import { Node, mergeAttributes } from '@tiptap/core'

export interface DebateArgumentsOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    debateArguments: {
      insertDebateArguments: () => ReturnType
    }
  }
}

export const DebateArguments = Node.create<DebateArgumentsOptions>({
  name: 'debateArguments',

  group: 'block',

  content: 'block*',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [{ tag: 'debate-arguments' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['debate-arguments', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      insertDebateArguments:
        () =>
        ({ commands }) => commands.insertContent({
            type: this.name,
            attrs: {},
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Débat : insérer vos arguments ici' }],
              },
            ],
          }),
    }
  },
})
