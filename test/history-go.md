---
layout: default
title: history.go(-1)
---

<style>
.button {
    padding: 10px;
    background: #43ac43;
    border-radius: 5px;
    text-align: center;
    color: white;
}
</style>

<div onclick="goback()" class="button">Go Back</div>

<script>
function goback() {
    history.go(-1);
}
</script>