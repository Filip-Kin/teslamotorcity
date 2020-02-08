window.addEventListener('load', () => {
    if (document.forms[0].add.innerText === "SAVE") {
        for (let field in car) {
            console.log(field);
            if (document.forms[0][field].length == undefined) {
                document.forms[0][field].value = car[field];
            } else {
                if (field === 'drive') {
                    switch (car[field]) {
                        case 'Front wheel drive': document.forms[0][field][2].checked = true;
                        case 'Rear wheel drive': document.forms[0][field][1].checked = true;
                        case 'All wheel drive': document.forms[0][field][0].checked = true;
                    }
                } else if (field === 'transmission') {
                    switch (car[field]) {
                        case 'Automatic': document.forms[0][field][1].checked = true;
                        case 'Manual': document.forms[0][field][0].checked = true;
                    }
                } else if (field === 'fuel') {
                    switch (car[field]) {
                        case 'Gas': document.forms[0][field][2].checked = true;
                        case 'Hybrid': document.forms[0][field][1].checked = true;
                        case 'Electric': document.forms[0][field][0].checked = true;
                    }
                }
            }
        }
        M.updateTextFields();
    }

    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = imageIsLoaded;
        }
    });
  });