//清除本地存储
// function clear() {
//     localStorage.clear();
//     // 加载缓存
//     load();
// }

// // form表单按下enter自动提交
// function postaction() {
//     var title = document.getElementById("title");
//     if (title.value == "") {
//         alert("内容不能为空");
//     } else {
//         // 先读取本地存储的数据
//         var data = loadData();
//         // 设置待办事项
//         var todo = { "title": title.value, "done": false };
//         // 将事项添加到数据中
//         data.push(todo);
//         // 保存数据到本地存储中
//         saveData(data);
//         // 表单重置
//         var form = document.getElementById("form");
//         form.reset();
//         // 渲染页面
//         load();
//     }
// }
// // 获取本地存储的数据，将字符串转换成对象形式JSON.parse
// function loadData() {
//     var collection = localStorage.getItem("todo");
//     if (collection != null) {
//         return JSON.parse(collection);
//     } else return [];
// }
// //保存数据到本地存储，但是本地存储只能保存字符串的数据格式，将数组对象转换成JSON字符串形式JSON.stringify
// function saveData(data) {
//     localStorage.setItem("todo", JSON.stringify(data));
// }
// // 事项前面的选择框变化，更新事项状态或事项内容
// function update(i, field, value) {
//     var data = loadData();
//     // 保存要更改的第i个事项给todo，data删除事项
//     var todo = data.splice(i, 1)[0];
//     // todo更改状态
//     todo[field] = value;
//     // data添加更改后的第i个事项
//     data.splice(i, 0, todo);
//     //保存数据
//     saveData(data);
//     //更新数据到页面中
//     load();
// }
// //事项内容改变，保存改变后的内容
// function edit(i) {
//     load();
//     var p = document.getElementById("p-" + i);
//     title = p.innerHTML;
//     p.innerHTML = "<input id='input-" + i + "' value='" + title + "' />";
//     var input = document.getElementById("input-" + i);
//     // input获得焦点后选中整个内容
//     input.setSelectionRange(0, input.value.length);
//     input.focus();
//     input.onblur = function() {
//         if (input.value.length == 0) {
//             p.innerHTML = title;
//             alert("内容不能为空");
//         } else {
//             updata(i, "title", input.value);
//         }
//     };
// }
// // 移除事项
// function remove(i) {
//     var data = loadData();
//     // 保存要更改的第i个事项给todo，data删除事项
//     var todo = data.splice(i, 1)[0];
//     // 保存删除后的data
//     saveData(data);
//     // 更新页面
//     load();
// }

// // 更新页面
// function load() {
//     var todolist = document.getElementById("todolist");
//     var donelist = document.getElementById("donelist");
//     var collection = localStorage.getItem("todo");
//     if (collection != null) {
//         var data = JSON.parse(collection);
//         var todoCount = 0;
//         var doneCount = 0;
//         var todoString = "";
//         var doneString = "";
//         for (var i = data.length - 1; i >= 0; i--) {
//             //已完成
//             if (data[i].done) {
//                 doneString += "<li draggable='true'><input type='checkbox' onchange='update(" + i + ",\"done\",false)' checked='checked' />" +
//                     "<p id='p-" + i + "' onclick='edit(" + i + ")'>" + data[i].title + "</p>" +
//                     "<a href='javascript:remove(" + i + ")'>-</a></li>";
//                 doneCount++;
//             }
//             // 未完成
//             else {
//                 todoString += "<li draggable='true'><input type='checkbox' onchange='update(" + i + ",\"done\",true)' />" +
//                     "<p id='p-" + i + "' onclick='edit(" + i + ")'>" + data[i].title + "</p>" +
//                     "<a href='javascript:remove(" + i + ")'>-</a></li>";
//                 todoCount++;
//             }
//         };
//         todocount.innerHTML = todoCount;
//         todolist.innerHTML = todoString;
//         donecount.innerHTML = doneCount;
//         donelist.innerHTML = doneString;
//     } else {
//         todocount.innerHTML = 0;
//         todolist.innerHTML = "";
//         donecount.innerHTML = 0;
//         donelist.innerHTML = "";
//     }
// }

// window.onload = load;

// window.addEventListener("storage", load, false);

// jquery版
$(function() {
    load();
    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() === '') {
                alert("内容不能为空");
            } else {
                var data = getData();
                data.push({ title: $(this).val(), done: false });
                console.log(data);

                saveData(data);
                load();
                $(this).val("");
            }
        }
    });

    $("ol,ul").on("click", "a", function() {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();
    });
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        // 先获取本地存储的数据
        var data = getData();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();
    });

    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };

    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    };

    function load() {
        var data = getData();
        $("ol,ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' /><p>" + n.title + "</p><a herf='javascript:;' id='" + i + "'></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' /><p>" + n.title + "</p><a herf='javascript:;' id='" + i + "'></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    };
})