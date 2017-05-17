---
layout: default
title: history.go(-1)
---

<style>
.button {
    padding: 5px 10px;
    border: 1px solid #CCC;
    background: #CCC;
    border-radius: 10px;
}
</style>

<div onclick="goback()" class="button">Go Back</div>

<script>
function goback() {
    history.go(-1);
}
</script>