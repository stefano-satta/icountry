<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { ItemProps } from '../types';
    import {truncateText} from './../utils';

    const props = defineProps<{itemToDo: ItemProps}>();
    const emit = defineEmits(['emitCompletedItem', 'emitRemoveItem'])
    const {text, isCompleted,} = props.itemToDo;
    const toggleItemCompleted = ref(isCompleted);
        
    watch(toggleItemCompleted, (checkedValue: boolean) => {
        emit('emitCompletedItem', {...props.itemToDo, isCompleted: checkedValue});
    });

    const removeItem = () => {
        emit('emitRemoveItem', props.itemToDo);
    }

</script>

<template>
    <div class="w-5/6 md:w-1/3 h-20 py-2 px-4 border bg-white dark:bg-slate-700 flex items-center rounded-md my-2">
        <input type="checkbox" name="" id="" class="flex-none accent-emerald-300" :checked="toggleItemCompleted" v-model="toggleItemCompleted">
        <div class="grow px-4 dark:text-white truncate" :class="toggleItemCompleted && 'line-through' ">{{ truncateText(text) }}</div>
        <i class="fa-solid fa-trash fa-sm flex-none w-14 text-right dark:text-red-600 cursor-pointer" 
            @click="removeItem"/>
    </div>
</template>

<style scoped></style>