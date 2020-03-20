<template>
    <div v-if="type == 'menu'&&title">
        <svg-icon :icon-class="icon.includes('icon')?icon:'iconcaozuorizhi1'"/>
        <span slot="title">{{ title }}</span>
    </div>
    <span v-else-if="type == 'tag'&&title">
        <svg-icon :icon-class="icon.includes('icon')?icon:'iconcaozuorizhi1'"/>
        <span>{{ title }}</span>
    </span>
</template>
<script>
export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'menu'
    }
  }
  // render(h, context) {
  //   const { icon, title, type } = context.props;
  //   const vnodes = [];
  //
  //   if (icon) {
  //     if (icon.includes('icon')) {
  //       vnodes.push(`<svg-icon icon-class={icon}/>`);
  //     } else {
  //       vnodes.push(`<svg-icon icon-class='iconcaozuorizhi1'/>`);
  //     }
  //   } else {
  //     vnodes.push(`<svg-icon icon-class='iconcaozuorizhi1'/>`);
  //   }
  //
  //   if (type == 'menu') {
  //     if (title) {
  //       vnodes.push(`<span slot='title'>{(title)}</span>`);
  //     }
  //   }
  //   if (type == 'tag') {
  //     if (title) {
  //       vnodes.push(`<span>{(title)}</span>`);
  //     }
  //   }
  //
  //   return vnodes;
  // }
};
</script>
