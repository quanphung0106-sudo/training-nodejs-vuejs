<template>
    <div class="classListWrapper">
        <div class="classList">
            <a-typography-title>Manage Information</a-typography-title>
            <div style="margin-bottom: 10px; width: 100%;display: flex; justify-content: space-between;">
                <router-link :to="{ name: 'manage.list' }"><a-button type="primary">Go back to class
                        list</a-button></router-link>
                <router-link :to="{ name: 'manage.studentForm' }"><a-button type="primary">Add new
                        student</a-button></router-link>
            </div>
            <p>Class: {{ myClass.nameClass }}</p>
            <a-table style="width: 100%;" :columns="columns" :data-source="students">
                <template #action="{ record }">
                    <div>
                        <router-link :to="{ name: 'manage.studentEdit', params: { id: record._id } }">
                            <a-button type="primary">Edit</a-button>
                        </router-link>
                        <a-divider type="vertical" />
                        <a-button type="danger" @click="onDelete(record._id)">Delete</a-button>
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>
    
<script>
const columns = [
    {
        title: 'Student ID',
        dataIndex: '_id',
        key: '_id',
    },
    {
        title: 'Student Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
    },
];
export default {
    name: 'ClassList',
    data() {
        return {
            myClass: {},
            students: [],
            columns,
            myClassId: ''
        }
    },
    created() {
        let classId = this.$route.params.id
        if (classId) {
            this.getClassData(classId)
            this.myClassId = classId;
        }
    },
    methods: {
        async getClassData(classId) {
            try {
                const res = await this.axios.get(`http://localhost:8801/api/classes/${classId}`);
                if (res.data) {
                    this.students = res.data.students
                    this.myClass = res.data
                }
            } catch (err) {
                console.log(err)
            }
        },
        onDelete(studentId) {
            console.log(studentId)
            this.$swal.fire({
                title: 'Do you want to delete the item?',
                showDenyButton: true,
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await this.axios.delete(`http://localhost:8801/api/students/${studentId}`)
                        if (res.status === 200) {
                            this.getClassData(this.myClassId)
                            this.$swal.fire('Deleted', '', 'success')
                        }
                    } catch (err) { console.log(err) }
                } else {
                    return
                }
            })
        },
    }
}
</script>
  
<style>
@import '~ant-design-vue/dist/antd.css';

.classListWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.classList {
    width: 65%;
}

.classList>p {
    font-size: 22px;
    font-weight: 600;
}
</style>