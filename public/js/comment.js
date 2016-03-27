var Comments = {
    
    answer_button : null,
    comment_body : null,
    comments_list : null,
    
    form : {
        wrapper : null,
        parent_id : null,
        root_id : null,    
        add_comment_button : null,
        add_answer_to : null,
        cancel_answer_button : null,
        add_comment_field : ""
    },
    
    init : function() {
        this.form.wrapper              = document.getElementById("comment_form");
        this.form.parent_id            = this.form.wrapper.parent_id;
        this.form.root_id              = this.form.wrapper.root_id;  
        this.form.add_comment_button   = this.form.wrapper.add_comment_button;
        this.form.add_answer_to        = document.getElementById('add_answer_to');
        this.form.cancel_answer_button = document.getElementById('cancel_answer');
        this.form.add_comment_field    = this.form.wrapper.add_comment_field;
        
        this.comments_list             = document.getElementById('page_comments');
    
        this.clear_textarea();
        
        this.form.add_comment_field.addEventListener('input', Comments.enable_button, false);
        
        var _this = this;
        
        this.form.cancel_answer_button.addEventListener('click', function() {
            Comments.prepare_form({
                parent_id : 0,
                root_id : 0,
                button_value : 'Оставить комментарий',
                to_user : '',
                cancel_button : '',
                comment_field_rows : 6,
                fit_comment_width : false,
                where_to_append : _this.comments_list
            })
        }, false);
    },
    
    /**
     * Очищаем textarea после перезагрузки страницы
     */
    clear_textarea : function() {
        this.form.add_comment_field.value = "";
    },

    answer : function(comment_id, root_id, author) {
        this.answer_button = document.getElementById('answer_button_' + comment_id);
        
        var _this = this;
        
        this.answer_button.addEventListener('click', function() {
            _this.comment_body  = document.getElementById('comment_' + comment_id);
            
            Comments.prepare_form({
                parent_id : comment_id,
                root_id : root_id,
                button_value : 'Ответить',
                to_user : 'пользователю ' + '<b>' + author + '</b>',
                cancel_button : '<i class="icon-cancel"></i>',
                comment_field_rows : 4,
                fit_comment_width : true,
                where_to_append : _this.comment_body
            })
        }, false);
    },
    
    prepare_form : function(settings) {
        // Заполняем hidden поля формы значениями root_id и parent_id или нулями.
        this.form.parent_id.value = settings.parent_id;
        this.form.root_id.value   = settings.root_id;
            
        // Оформляем форму комментария
        this.form.add_comment_button.value       = settings.button_value;
        this.form.add_answer_to.innerHTML        = settings.to_user;
        this.form.cancel_answer_button.innerHTML = settings.cancel_button;
            
        // Сжимаем/растягиваем по высоте текстовое поле формы комментария, переводим фокус на него
        this.form.add_comment_field.rows = settings.comment_field_rows;
        this.form.add_comment_field.focus();
            
        // Перемещаем форму под текущий комментарий или под все комментарии, подгоняем ее ширину
        if(settings.fit_comment_width) {
            this.form.wrapper.classList.add('answer_form');
        } else {
            this.form.wrapper.classList.remove('answer_form');
        }
        settings.where_to_append.appendChild(this.form.wrapper);
    },

    /**
     * Отключаем кнопку submit, если поле пустое или поле только с пробелами
     */
    enable_button : function() {
        var field_value = this.form.add_comment_field.value.trim();
        
        this.form.add_comment_button.disabled = !field_value;         
    }
};
