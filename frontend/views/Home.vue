<template>
   <div class="container">
    <div class="dashboard">
      <h1 class="title_service">IOT MANAGEMENT</h1>
      <nav class="navigation">
        <ul>
          <li><router-link to="/" class="navlink">View Device</router-link></li>
          <li><router-link to="/Device" class="navlink">Add New Device</router-link></li>
        </ul>
      </nav>
    </div>
   </div>
  <div class="content">
    <h2 id="thetotal">Number of available device:{{ countDevice }}</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Device Name</th>
          <th>Serial Number</th>
          <th>Location</th>
          <th>Type Device</th>
          <th>Status Devices</th>
          <th>Edit</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in state.devices" :key="device._id">
          <td>{{ device.name }}</td>
          <td>{{ device.serialNumber }}</td>
          <td>{{ device.location }}</td>
          <td>{{ device.type }}</td>
          <td>{{ device.status }}</td>
          <td>
            <router-link :to="`/todo/${device._id}`">
                <button class="btn btn-warning">Edit Device</button>
              </router-link>
          </td>
          <td>
            <button class="btn btn-danger" @click="confirmDelete(device._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  
  <script>
    import todocrud from '../src/modules/todocrud'
    import { onMounted , computed } from 'vue';

    export default {
      setup() {
        const { state, GetAllTodos, newTodo, deleteTodo ,editTodo } = todocrud();
        

        onMounted(() => {
          GetAllTodos();
        });
        const countDevice = computed(() => {
      if (state.value.devices && Array.isArray(state.value.devices)) {
        return state.value.devices.length;
      }
      
      return 0;
    });
    const confirmDelete = (deviceId) => {
      if (confirm('Are you sure you want to delete this device?')) {
        deleteTodo(deviceId);
      }
    };
        return { state, GetAllTodos, newTodo, deleteTodo,editTodo,confirmDelete,countDevice };
      }
    }
    </script>
  
  <style scoped>
  body {
    margin: 0;
    padding: 0;

    
}
.container {
  display: flex;
}

.dashboard {
  background-color: white;
  box-shadow: 0px 100px 100px rgb(0 0 0 / 0.2);
  color: black;
  width: 300px;
  height: 100vh; /* Full height */
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.title_service {
  padding: 10px;
  margin-top: 0;
  font-size: 30px;
  font-weight: 700;
}


.navigation ul {
  list-style-type: none;
  padding: 0;
}

.navigation li a.navlink {
  padding: 20px 15px;
  text-decoration: none;
  font-size: 18px;
  color: darkgray;
  display: block;
  transition: 0.5s;
  font-weight: 700;

}

.navigation li a.navlink:hover {
  background-color: rgb(210, 187, 187);
}
  .content {
  margin-left: 400px; 
  padding: 20px;
}

.table {
  position: absolute;
  left: 380px;
  top: 100px;
  width: 1100px;
  border-collapse: collapse;
  
}

.table th, .table td {
  padding:15px;
  border: 1px solid darkgray;
  text-align: left;
}

.table th {
  background-color: rgb(210, 187, 187);
  color: white;
}
.table td{
  color: rgb(95, 95, 95);
  font-weight: 700;
}


.btn{
  font-weight: 400;
}
#thetotal{
  position: absolute;
  top: 30px;
  left: 750px;
  background-color: rgb(89, 88, 88);
  color: white;
  padding: 15px;
  font-size: 20px;
  border-radius: 10px;
}

  
  </style>
  
  