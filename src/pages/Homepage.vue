<script setup lang="ts">
    import { ref } from 'vue';
    import ToDoItem from '../components/ToDoItem.vue';
    import head_wallpaper from './../assets/images/wallpaper_homepage.png';
    import { ItemProps } from '../types';

    const toDoList = ref<ItemProps[]>([
        // {id: 1, isCompleted: false, text: Array(80).fill('I').toString(), creationDate: new Date().toLocaleDateString() },
        // {id: 2, isCompleted: true, text: 'First item', creationDate: new Date().toLocaleDateString() },
        // {id: 3, isCompleted: true, text: 'Second item', creationDate: new Date().toLocaleDateString() }
    ]);
    let newItem = '';

    const createItem = (e: Event) => {
        const textInserted = (e.target as HTMLInputElement).value;
        toDoList.value.push({id: toDoList.value.length+2, isCompleted: false, text: textInserted, creationDate: new Date().toLocaleDateString()});
        newItem = '';
    }

    const completedItem = (itemChanged: ItemProps) => {
        let indexToEdit = toDoList.value.findIndex(el => el.id == itemChanged.id);
        toDoList.value[indexToEdit].isCompleted = itemChanged.isCompleted;
    };

    const deleteItem = (itemRemoved: ItemProps) => {
        toDoList.value = toDoList.value.filter(el => el.id != itemRemoved.id);
    }
</script>

<template>
    <div class="w-full py-8 flex justify-center items-center flex-col">
        <img :src="head_wallpaper" alt="todolist_img" class="w-64 md:w-1/5 mb-8">
        <input type="text"
            class="border bg-white dark:bg-slate-700 rounded-full px-4 py-4 w-5/6 md:w-1/2 
                focus:shadow focus:shadow-grey-900 focus:outline-none placeholder:text-center dark:text-white"
            value=""
            placeholder="Insert new task"
            v-model="newItem"
            @keyup.enter="createItem($event)"/>
    </div>
    <div class="w-full py-6 md:py-8 flex items-center flex-col">
        <div v-if="toDoList.length" class="flex justify-end full-w dark:text-white w-5/6 md:w-1/3">Items: {{ toDoList.length }}</div>
        <ToDoItem v-if="toDoList.length" 
            v-for="itemToDoList in toDoList" 
            :key="itemToDoList.id"
            :itemToDo="itemToDoList"
            @emitCompletedItem="completedItem($event)"
            @emitRemoveItem="deleteItem($event)"/>
    </div>
</template>

<style scoped></style>