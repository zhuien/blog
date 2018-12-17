<template>
    <div class="container">
        <Editor :prop="id"></Editor>
    </div>
</template>

<script>
import Editor from '../eleditor/Eleditor'
export default {
    components: {
        Editor
    },

    data () {
        return {
            id: ''
        }
    }
    
}
</script>

