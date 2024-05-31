<template>
    <div class="date">
        <p class="day">{{ day }}</p>
        <p class="month">{{ month }}.</p>
    </div>
</template>

<script>
export default {
    name: 'DayJo',
    props: {
        month: String,
        day: Number
    }
}
</script>


<style>
.date {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 70px;
    height: 40px;
    background: #000;
    color: #FFF;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: .2s;
}

.date:hover {
    background: #fff;
    color: #000;
    border: 1px solid #000;
}

.month {
    font-weight: 400;
    font-size: 15px;
}

.day {
    font-size: 18px;
    font-weight: 600;
}
</style>