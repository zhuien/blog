<template>
    <div>
        <template v-for="item in items">
            <template v-if="item.children">
                <el-submenu :index="item.url" :key="item.url">
                    <template slot="title">
                        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                    </template>
                    <tree-menu :items="item.children"></tree-menu>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.url" :key="item.url">
                    <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </template>
        </template>
    </div>
</div>
 
<script>

export default {
    name: 'TreeMenu',
    data () {
        return {
            item: [],
        }
    },
    props: ['items']
}

</script>