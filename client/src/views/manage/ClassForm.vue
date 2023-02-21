<template>
    <div class="">
        <h1>This is Form page</h1>
        <router-link to="/"><a-button type="primary">Back to List</a-button></router-link>
        <form @submit.prevent="save()">
            <div class="form-group">
                <a-input addon-before="Class name::" :class="{ error: error.nameClass }" type="text"
                    :value="data.nameClass ? data.nameClass : ''" @input="data.nameClass = $event.target.value" required
                    placeholder="Enter student class name" />
                <span class="error" v-show="error.nameClass !== ''">Error: {{ error.nameClass }}</span>
            </div>
            <button type="submit">{{ myClassId ? 'Update class' : 'Add class' }}</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
            error: {
                nameClass: '',
            },
            data: {
                nameClass: '',
            },
            myClassId: ''
        }
    },
    created() {
        let dataId = this.$route.params.id
        if (dataId) {
            this.getOne(dataId)
            this.myClassId = dataId
        }
    },
    methods: {
        validate() {
            let isValid = true;
            if (!this.data.nameClass) {
                this.error.nameClass = "This field is required."
                isValid = false;
            }
            return isValid;
        },
        async save() {
            if (this.validate()) {
                try {
                    const res = this.myClassId ? await this.axios.put(`http://localhost:8801/api/classes/${this.myClassId}`, this.data) : await this.axios.post('http://localhost:8801/api/classes', this.data)
                    if (res.data) this.$router.push({ name: 'manage.list' })
                } catch (err) {
                    console.log(err)
                }
            }
        },
        keydown() {
            if (this.data.nameClass) {
                this.error.nameClass = ''
            }
        },
        async getOne(dataId) {
            const res = await this.axios.get(`http://localhost:8801/api/classes/${dataId}`)
            if (res.data) {
                this.data = res.data
            }
        },
    },
}
</script>

<style>
@import '~ant-design-vue/dist/antd.css';

.error {
    color: red;
    border-color: red;
    margin-left: 5px;
}

form {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
}

.form-group {
    width: 70%;
}

.label {
    display: inline-block;
    min-width: 200px;
}

button {
    padding: 10px;
}
</style>