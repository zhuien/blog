<template>
    <div class="wrapper">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<style lang="less">
html,
body,
#app,
.wrapper {
    width: 100%;
    height: 100%;
    overflow: auto !important;
}
</style>
