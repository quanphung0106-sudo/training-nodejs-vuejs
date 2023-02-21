<template>
    <div class="classFormWrapper">
        <div class="classForm">
            <h1>This is Form page</h1>
            <router-link to="/"><a-button type="primary">Back to List</a-button></router-link>
            <form @submit.prevent="save()" style="display: flex;flex-direction: column;gap: 10px;">
                <div class="form-group">
                    <a-input addon-before="Student name:" :class="{ error: error.name }" type="text"
                        :value="data.name ? data.name : ''" @input="data.name = $event.target.value" required
                        placeholder="Enter student name" />
                    <span class="error" v-show="error.name !== ''">Error: {{ error.name }}</span>
                </div>
                <div class="form-group">
                    <a-input addon-before="Age:" :class="{ error: error.age }" type="number" required
                        :value="data.age ? data.age : null" @input="data.age = Number($event.target.value)"
                        placeholder="Enter student age" />
                    <span class="error" v-show="error.age !== '' && error.age !== null">Error: {{ error.age }}</span>
                </div>
                <div class="form-group">
                    <a-input addon-before="Email:" :class="{ error: error.email }" type="email"
                        :value="data.email ? data.email : null" @input="data.email = $event.target.value" required
                        placeholder="Enter student email" />
                    <span class="error" v-show="error.email !== ''">Error: {{ error.email }}</span>
                </div>
                <div class="form-group" style="display: flex; justify-content: flex-start;">
                    <label class="label" style="margin-right: 10px;">Class:</label>
                    <a-select ref="select" style="width: 120px" @focus="focus" @change="handleChange">
                        <a-select-option v-for="(classOption, index) in classOptions" :key="index"
                            :value="classOption._id">{{
                                classOption.nameClass }}</a-select-option>
                    </a-select>
                </div>
                <div style="width: 100%;"><button type="submit" style="width: 220px;">{{ myStudentId ? 'Update' : 'Add' }}</button></div>
                {{ log(data) }}
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
            error: {
                name: '',
                age: null,
                email: '',
                class: '',
            },
            data: {
                name: '',
                age: null,
                email: '',
                class: '',
            },
            classOptions: [],
            myStudentId: ''
        }
    },
    created() {
        let dataId = this.$route.params.id
        this.getClassOptions()
        if (dataId) {
            this.getOne(dataId)
            this.myStudentId = dataId
        }
    },
    methods: {
        log(message) {
            console.log(message);
        },
        handleChange(value) {
            this.data.class = value;
        },
        validate() {
            let isValid = true;
            if (!this.data.name) {
                this.error.name = "This field is required."
                isValid = false;
            }
            if (!this.data.age) {
                this.error.age = "This field is required."
                isValid = false;
            }
            if (!this.data.email) {
                this.error.email = "This field is required."
                isValid = false;
            }
            return isValid;
        },
        async save() {
            if (this.validate()) {
                try {
                    const res = this.myStudentId ? await this.axios.put(`http://localhost:8801/api/students/${this.myStudentId}`, this.data) : await this.axios.post('http://localhost:8801/api/students', this.data)
                    if (res.data) this.$router.push({ name: 'manage.list' })
                } catch (err) {
                    console.log(err)
                }
            }
        },
        keydown() {
            if (this.data.name) {
                this.error.name = ''
            }
            if (this.data.age) {
                this.error.age = ''
            }
            if (this.data.email) {
                this.error.email = ''
            }
        },
        async getOne(dataId) {
            const res = await this.axios.get(`http://localhost:8801/api/students/${dataId}`)
            if (res.data) {
                this.data = res.data
            }
        },
        async getClassOptions() {
            const res = await this.axios.get('http://localhost:8801/api/classes')
            if (res.data) res.data.map((data) => {
                return this.classOptions.push({
                    _id: data._id,
                    nameClass: data.nameClass
                })
            })
        }
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

.classFormWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.classForm {
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>