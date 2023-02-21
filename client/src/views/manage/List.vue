<template>
  <div class="classListWrapper">
    <div class="classList">
      <a-typography-title>Manage Information</a-typography-title>
      <div class="schoolInfo" v-for="(data, index) in school" :key="index">
        <p>School name: {{ data.nameSchool }}</p>
        <p>School address: {{ data.address }}</p>
        <p>School email: {{ data.email }}</p>
      </div>
      <div style="width:100%; display: flex;justify-content: flex-end;">
        <router-link :to="{ name: 'manage.form' }"><a-button type="primary" style="margin-bottom: 10px;">Add new
            class</a-button></router-link>
      </div>
      <a-table :columns="columns" :data-source="myClass">
        <template #_id="{ text }">
          <router-link class="link" :to="{ name: 'manage.class', params: { id: text } }">
            {{ text }}
          </router-link>
        </template>
        <template #action="{ record }">
          <div>
            <router-link :to="{ name: 'manage.edit', params: { id: record._id } }">
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
    title: "Class ID",
    dataIndex: '_id',
    key: '_id',
    slots: { customRender: '_id' }
  },
  {
    title: 'Class',
    dataIndex: 'nameClass',
    key: 'nameClass',
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
      school: [],
      myClass: [],
      columns
    }
  },
  created() {
    this.getSchoolData()
  },
  methods: {
    async getSchoolData() {
      try {
        const res = await this.axios.get('http://localhost:8801/api/school');
        if (res.data) {
          this.myClass = res.data[0].classes
          this.school = res.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    onDelete(classId) {
      console.log(classId)
      this.$swal.fire({
        title: 'Do you want to delete this class?',
        showDenyButton: true,
        confirmButtonText: 'Yes'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await this.axios.delete(`http://localhost:8801/api/classes/${classId}`)
            if (res.status === 200) {
              this.getSchoolData()
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

.link {
  text-decoration: underline;
}

.schoolInfo p {
  font-size: 22px;
  font-weight: 600;
}
</style>