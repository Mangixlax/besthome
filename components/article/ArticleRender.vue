<template lang="pug" functional>
  component(
    :is="$options.getComponentName(props.block.type)"
    :block="props.block"
    v-bind="{ ...data.attrs, ...(props.block.type === 'header' && props.index.toString().length > 0 ? { id: `ahead_${props.index}` } : {}) }"
  )
</template>

<script>
import paragraph from '@/components/article/content/ContentParagraph'
import header from '@/components/article/content/ContentHeader'
import delimiter from '@/components/article/content/ContentDivider'
import quote from '@/components/article/content/ContentBlockquote'
import image from '@/components/article/content/ContentImage'
import embed from '@/components/article/content/ContentEmbed'
import code from '@/components/article/content/ContentCode'
import list from '@/components/article/content/ContentList'
import linkTool from '@/components/article/content/ContentLinkTool'
export default {
  name: 'ArticleRender',
  props: {
    block: {
      type: Object,
      default: () => ({
        type: 'fragment',
      }),
    },
    index: {
      type: [String, Number],
      default: '',
    },
  },
  inject: {
    components: {
      default: {
        paragraph,
        paragraphWithAside,
        header,
        delimiter,
        quote,
        image,
        embed,
        code,
        list,
        linkTool,
      },
    },
  },
  getComponentName(block_type = '') {
    if (block_type) {
      const componentName = Object.keys(this.inject.components.default).includes(block_type)
        ? this.inject.components.default[block_type]
        : 'fragment'

      if (componentName === 'paragraph' && this.block.asideText?.length > 0) {
        return 'paragraphWithAside'
      }
    }

    return componentName
  },
}
</script>
