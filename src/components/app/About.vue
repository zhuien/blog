<template>
    <div>
        <el-steps direction="vertical" :active="1">
            <el-step icon="el-icon-circle-check-outline" title="步骤 1" class="is-finish"></el-step>
            <el-step title="步骤 2" class="is-finish"></el-step>
            <el-step title="步骤 3" class="is-finish" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {

}    
</script>

<style lang="less">

</style>
