<template>
    <div class="dashboard">
        <h1 class="title_service">IOT MANAGEMENT</h1>
        <nav class="navigation">
          <ul>
            <li><router-link to="/" class="navlink">View Device</router-link></li>
            <li><router-link to="/Device" class="navlink">Add New Device</router-link></li>
          </ul>
        </nav>
      </div>
        <h1 id="title">EDIT DEVICE</h1>
        <div class="container">
            <div class="section" v-if="device" >
                <label for="deviceName" class="form-label" id="deviceDetails"><span>Device Name:</span>{{ device.name }}</label><br>
                <label for="deviceName" class="form-label" id="deviceDetails"><span>Device Type:</span>{{ device.type }}</label><br>
                <label for="deviceName" class="form-label" id="deviceDetails"><span>Device Serial Number:</span>{{ device.serialNumber }}</label>
            </div>



            <div class="mb-2">
              <label for="deviceLocation" class="form-label">Location:</label>
              <input class="form-control" id="deviceLocation" type="text" placeholder="Enter New Location" v-model="state.newLocation">
              <span style="color: red">{{ validationErrors.locationError }}</span>
            </div>

              <!-- Status select field -->
            <div class="mb-2">
                <label for="deviceStatus" class="form-label">Status</label>
                <select class="form-select" id="deviceStatus" v-model="state.newstatus" required>
                        <option default disabled value="">Update Status</option>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                        <option value="decommissioned">decommissioned</option>
                </select>
                <span style="color: red">{{ validationErrors.statusError }}</span>
            </div>
            

            <button @click="toEdit(deviceId)">Update</button>
            <div v-if="successMessage" class="success-message">
              <h1>{{ successMessage }}</h1>
            </div>
            
        </div>
</template>

<script>
import { onMounted, reactive , ref } from 'vue'
import todocrud from '../src/modules/todocrud'

export default {
  setup() {
    const { editTodo, state, GetSpecificTodo, device, deviceId } = todocrud();

    const validationErrors = reactive({
      locationError: '',
      statusError: '',
    });


    const validation = () => {
      let isValid = true;

      if (!state.value.newLocation || state.value.newLocation.trim().length === 0) {
        validationErrors.locationError = 'Location is required';
        isValid = false;
      } else {
        validationErrors.locationError = '';
      }

      if (!state.value.newstatus) {
        validationErrors.statusError = 'Status is required';
        isValid = false;
      } else {
        validationErrors.statusError = '';
      }

      return isValid;
    };

    const successMessage = ref(''); // Define successMessage as a reactive reference

    const toEdit = async () => { 
    if (validation()) {
        try {
          const message = await editTodo(
            deviceId.value, 
            state.value.newLocation, 
            state.value.newstatus
            );
          
          successMessage.value = message;
         // console.log(successMessage.value);

          Object.keys(validationErrors).forEach(key => {
            validationErrors[key] = '';//clear the validation
          });
        } catch (error) {
          console.error('Edit failed:', error);
        }
      }
    };


          onMounted(async () => {
              await GetSpecificTodo();
          });

          return {
            successMessage,
            
              device,
              deviceId,
              toEdit,
              state,
              validationErrors
          };
      }
  }
</script>



<style lang="scss" scoped>

.success-message{
  color: green;
  background-color: #D4EDDA;
  text-align: center;
  
}

#title{
  position: absolute;
  left: 750px;
  top: 20px;
}
body {
    margin: 0;
    padding: 0;

    
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
  color: grey;
  display: block;
  transition: 0.5s;
  font-weight: 700;

}
.container{
        background-color:white;
        padding: 50px;
        color: black;
        margin-top: 100px;
        border-radius: 10px;
        width: 1000px;
        border: 1px solid black;
        position: absolute;
        top: 0px;
        left: 400px;
    }

.navigation li a.navlink:hover {
  background-color: rgb(210, 187, 187);
}
  .content {
  margin-left: 400px; 
  padding: 20px;
}
.section{
      width: 1000px;
      padding-bottom: 10px;
      left: -50px;
      position: relative;
      border-bottom:3px solid gray ;
    }
    .form-control ,.form-select,.form-label{
      width: 700px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      font-size: 20px;
    }
    
#deviceDetails{
  font-size: 20px;

  font-weight: 500;
}
span{
  color:red;
  font-weight: 500;
}
</style>