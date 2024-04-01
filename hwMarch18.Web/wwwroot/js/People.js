$(() => {

    const Reload = function () {
        $("tbody tr").remove();
        $.get('/home/getpeople', function (people) {
            people.forEach(function ({ id, firstName, lastName, age }) {
                $("tbody").append(`
        <tr>
        <td>${firstName} </td>
        <td>${lastName} </td>
        <td>${age} </td>
        <td>
        <button class="btn btn-danger" data-id="${id}">Delete</button> 
        <button class="btn btn-info" data-id="${id}">Edit</button> 
        </td>
        </tr>
        `);
            })
        });
    }

    Reload();

    const modal = new bootstrap.Modal($(".modal")[0]);

    $("#add-button").on('click', function () {
        SetUpAddModal
        modal.show();
    })

    $("#save-person").on('click', function () {

        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var age = $("#age").val();

        $.post('/home/addperson', {firstName, lastName, age}, function (person) {
            modal.hide();
            Reload();
        })

        
    })

    $("table").on('click', '.btn-danger', function () {
        const id = $(this).data('id');
        $.post('/home/deleteperson', {id : id}, function (obj) {
            Reload();
        })
    })
    let personId = 0;
    $("table").on('click', '.btn-info', function () {
        const id = $(this).data('id');
        personId = id;
        $.post('/home/GetPersonById', { id: id }, function (person) {
            SetUpEditModal(person);
            modal.show();
        })
    })

    $("#update-person").on('click', function () {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var age = $("#age").val();
        var id = personId;

        $.post('/home/editperson', { id, firstName, lastName, age }, function (person) {
            modal.hide();
            Reload();
        })
    })

    function SetUpEditModal(person) {
        $("#firstName").val(person.firstName);
        $("#lastName").val(person.lastName);
        $("#age").val(person.age);
        $("#update-person").show();
        $("#save-person").hide();
    }

    function SetUpAddModal() {
        $("#firstName").val();
        $("#lastName").val();
        $("#age").val();
        $("#update-person").hide();
        $("#save-person").show();
    }

})