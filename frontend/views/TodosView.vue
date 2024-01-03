<template>
  <div>
    <h1>All Todos</h1><br>

    <button @click="newTodo">New todo-static</button>
    <br><br>

    <input type="text" placeholder="author" v-model="state.newAuthor"><br>
    <span>test:{{ state.newAuthor }}</span>
    <br>
    <input type="text" placeholder="todoitem" v-model="state.newTodoItem"><br>
    <span>test:{{ state.newTodoItem }}</span>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Todo</th>
            <th>Action</th> <!-- Fixed typo in "Manage" -->
            <th>Edit</th>
          </tr>
        </thead>
        <tbody> <!-- pass the id as we can see the id-->
        
          <tr v-for="todo in state.todos" :key="todo._id"> <!-- Fixed loop variable name -->
            
              <td>{{ todo.author }}</td>
              <td>{{ todo.todo }}</td>
            
              <router-link :to="`/todo/${todo._id}`">
                <td><button>Edit todo-static</button></td> 
              </router-link>
            <td><button @click="deleteTodo(todo._id)">Delete todo-static</button></td> 
            

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import todocrud from '../src/modules/todocrud'
import { onMounted } from 'vue';

export default {
  setup() {
    const { state, GetAllTodos, newTodo, deleteTodo ,editTodo } = todocrud();

    onMounted(() => {
      GetAllTodos();
    });

    return { state, GetAllTodos, newTodo, deleteTodo,editTodo };
  }
}
</script>

<style scoped>
.table {
  border-collapse: collapse;
  width: 100%;
}

.table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
