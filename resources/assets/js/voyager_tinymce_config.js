/*--------------------
|
| TinyMCE default config
|
--------------------*/

var getConfig = function (options) {

    var baseTinymceConfig = {
        menubar: false,
        selector: 'textarea.richTextBox',
        skin_url: $('meta[name="assets-path"]').attr('content') + '?path=js/skins/voyager',
        min_height: 600,
        resize: 'vertical',
        plugins: 'link, image, code, table, textcolor, lists, media, toc, wordcount',
        extended_valid_elements: 'input[id|name|value|type|class|style|required|placeholder|autocomplete|onclick],img[class|src|border=0|loading|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name]',
        image_title: true,
        file_picker_callback: function (e, t, n) {
            if ("image" == n.filetype) {
                var r = document.createElement("input");
                r.setAttribute("type", "file"),
                    r.setAttribute("accept", "image/*"),
                    r.onchange = function () {
                        var t = new FormData;
                        var file = this.files[0];
                        var fileName = file.name;
                        trimedFileName = fileName.substring(0, fileName.lastIndexOf('.'));
                        t.append("image", file),
                            t.append("type_slug", $("#upload_type_slug").val()),
                            $("#voyager-loader").css("z-index", 1e4),
                            $("#voyager-loader").fadeIn(),
                            $.ajax({
                                type: "post",
                                url: $("#upload_url").val(),
                                data: t,
                                enctype: "multipart/form-data",
                                processData: !1,
                                contentType: !1,
                                cache: !1
                            }).done((function (t) {
                                e(t.match(/setImageValue\('(?<uploadedURL>.*?)'\)/).groups.uploadedURL, { alt: trimedFileName, title: trimedFileName })
                            }
                            )).always((function () {
                                $("#voyager-loader").fadeOut(),
                                    $("#voyager-loader").css("z-index", 99)
                            }
                            ))
                    }
                    ,
                    r.click()
            }
        },
        toolbar: 'styleselect bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | link image table media | toc code',
        convert_urls: false,
        rel_list: [
            { title: 'none', value: '' },
            { title: 'dofollow backlink', value: 'external noopener noreferrer' },
            { title: 'nofollow backlink', value: 'external noopener noreferrer nofollow' },
        ],
        relative_urls: false,
        remove_script_host: true,
        init_instance_callback: function (editor) {
            if (typeof tinymce_init_callback !== "undefined") {
                tinymce_init_callback(editor);
            }
        },
        setup: function (editor) {
            if (typeof tinymce_setup_callback !== "undefined") {
                tinymce_setup_callback(editor);
            }
        },
    };

    return $.extend({}, baseTinymceConfig, options);
}

exports.getConfig = getConfig;
