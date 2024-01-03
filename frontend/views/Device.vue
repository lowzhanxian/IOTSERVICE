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
   
    <h1 id="title">ADD NEW DEVICE</h1>
    <div class="container mt-4">
      

      <form >
        <div class="section">
            <div class="mb-2">
              <label for="deviceName" class="form-label">Device Name:</label>
              <input type="text" class="form-control" id="deviceName" v-model="state.newName" minlength="3" required>
              <span style="color: red;">{{ checkValidation.nameValidate }}</span>
            </div>
        </div>
        <div class="section">
          <div class="mb-2">
            <label for="deviceserial" class="form-label">Serial Number:</label>
            <input type="text" class="form-control" id="deviceNum" v-model="state.newserialNumber" minlength="3" required>
            <span style="color: red;">{{ checkValidation.serialNumberValidate }}</span>

          </div>
        </div>
        <div class="section">
          <div class="mb-2">
            <label for="deviceLocation" class="form-label">Location:</label>
            <input type="text" class="form-control" id="deviceLocation" v-model="state.newLocation" minlength="3" required>
            <span style="color: red;">{{ checkValidation.locationValidate }}</span>

          </div>
        </div>
        <div class="section">
          <div class="mb-2">
            <label for="deviceType" class="form-label">Device Type</label>
            <select class="form-select" id="deviceType" v-model="state.newtype" required>
            
              <option value="energy">energy</option>
              <option value="waterflow">waterflow</option>
              <option value="seismic">seismic</option>
            </select>
            <span style="color: red;">{{ checkValidation.typeValidate }}</span>

          </div>

                  
        </div>
        <div class="section">
            <div class="mb-2">
              <label for="deviceStatus" class="form-label">Status</label>
              <select class="form-select" id="deviceStatus" v-model="state.newstatus" required>
                
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="decommissioned">decommissioned</option>
              </select>
              <span style="color: red;">{{ checkValidation.statusValidate }}</span>

            </div>

                  
        </div>
        
        
        
        
        
        <button class="btn btn-primary" @click="toadd">Add</button>
        <a href="/" ><h1 class="btn btn-danger">Cancel</h1></a>
        <div v-if="displaySuccess" class="alert-sucess">
          <h1>{{ displaySuccess }}</h1>
        </div>
      </form>
    </div>
  </template>
  
  <script>
    import todocrud from '../src/modules/todocrud'


    import { onMounted , reactive , ref} from 'vue';

    export default {
      setup() {
        const { state, GetAllTodos, newTodo, deleteTodo ,editTodo } = todocrud();
        
        // const state = ref({
            // newName: '',
            // newserialNumber: '',
            // newLocation: '',
            // newtype: '',
            // newstatus: '',
            
        // });   
        
        const checkValidation= reactive({
          nameValidate:'',
          serialNumberValidate:'',
          locationValidate:'',
          typeValidate:'',
          statusValidate:'',

        });
        
        const validate=()=>{
          let isValid = true;
          // check validate name
          if(!state.value.newName || state.value.newName.trim().length===0){
            checkValidation.nameValidate='Name field required !';
            isValid=false;

          }else{
            checkValidation.nameValidate='';
          }

          // check validate number serial device
          if(!state.value.newserialNumber || state.value.newserialNumber.trim().length===0){
            checkValidation.serialNumberValidate='Serial Number field required !';
            isValid=false;

          }else{
            checkValidation.serialNumberValidate='';
          }


        // check validate of the location 
          if(!state.value.newLocation || state.value.newLocation.trim().length===0){
            checkValidation.locationValidate='Location  field required !';
            isValid=false;

          }else{
            checkValidation.locationValidate='';
          }
          // check validation of the type 
          if(!state.value.newtype || state.value.newtype.trim().length===0){
            checkValidation.typeValidate='Please select device type required !';
            isValid=false;

          }else{
            checkValidation.typeValidate='';
          }
          // check validation of the type
          if(!state.value.newstatus || state.value.newstatus.trim().length===0){
            checkValidation.statusValidate='Please select device status required !';
            isValid=false;

          }else{
            checkValidation.statusValidate='';
          }
          return isValid ;
        };

          
        const displaySuccess=ref('');

        const toadd = async () => {
        
        // Validate input fields
        if (validate()) {
          try {
            // Perform the API call to add a new device
            const sumessage = await newTodo({
              name: state.value.newName,
              serialNumber: state.value.newserialNumber,
              location: state.value.newLocation,
              type: state.value.newtype,
              status: state.value.newstatus,
            });

            displaySuccess.value = sumessage;   
            Object.keys(checkValidation).forEach(key => {
            checkValidation[key] = '';//clear the validation
          });
            

          } catch (error) {
            displaySuccess.value = 'try again.';
          }
        }
      };

        onMounted(() => {
          GetAllTodos();
        });

        return {
          displaySuccess,
            state,
            toadd,
            checkValidation,
            GetAllTodos,
            deleteTodo ,editTodo
        };
      }


    }
</script>


  

<style scoped>
.alert-sucess{
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
  color: grey;
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

    .formtitle{
        text-align: center;
        background-color: gray;
        width: 900px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
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
        top: 50px;
        left: 400px;
    }
    .btn{
       margin: 20px;
       width: 200px;
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
      font-size: 20px;
      color: rgb(104, 103, 103);
    }
    .form-control,.form-select
    {
      border: 1px solid grey;
    }
    
    

</style>