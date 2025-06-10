// 문서가 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // 에디터 탭 기능
    const editorTabs = document.querySelectorAll('.editor-tab');
    const editorContent = document.querySelector('.editor-content');
    
    if (editorTabs.length > 0 && editorContent) {
        // 텍스트 에디터 초기화
        let currentEditor = 'text';
        initTextEditor();
        
        editorTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 활성 탭 변경
                editorTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 에디터 콘텐츠 변경
                currentEditor = this.getAttribute('data-editor');
                
                switch(currentEditor) {
                    case 'text':
                        initTextEditor();
                        break;
                    case 'image':
                        initImageEditor();
                        break;
                    case 'video':
                        initVideoEditor();
                        break;
                }
            });
        });
    }
    
    // 텍스트 에디터 초기화
    function initTextEditor() {
        editorContent.innerHTML = `
            <textarea placeholder="웹소설 내용을 입력하세요..."></textarea>
            <div class="editor-controls">
                <button id="save-text">저장</button>
                <button id="clear-text">지우기</button>
            </div>
        `;
        
        // 텍스트 에디터 이벤트 리스너
        document.getElementById('save-text').addEventListener('click', function() {
            alert('텍스트가 저장되었습니다.');
        });
        
        document.getElementById('clear-text').addEventListener('click', function() {
            document.querySelector('textarea').value = '';
        });
    }
    
    // 이미지 에디터 초기화
    function initImageEditor() {
        editorContent.innerHTML = `
            <div class="image-upload">
                <input type="file" id="image-upload" accept="image/*">
                <label for="image-upload">이미지 업로드</label>
            </div>
            <div class="image-preview"></div>
            <div class="editor-controls">
                <button id="save-image">저장</button>
                <button id="clear-image">지우기</button>
            </div>
        `;
        
        // 이미지 업로드 이벤트 리스너
        document.getElementById('image-upload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.maxWidth = '100%';
                    
                    const preview = document.querySelector('.image-preview');
                    preview.innerHTML = '';
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // 이미지 에디터 버튼 이벤트 리스너
        document.getElementById('save-image').addEventListener('click', function() {
            if (document.querySelector('.image-preview img')) {
                alert('이미지가 저장되었습니다.');
            } else {
                alert('저장할 이미지가 없습니다.');
            }
        });
        
        document.getElementById('clear-image').addEventListener('click', function() {
            document.querySelector('.image-preview').innerHTML = '';
            document.getElementById('image-upload').value = '';
        });
    }
    
    // 비디오 에디터 초기화
    function initVideoEditor() {
        editorContent.innerHTML = `
            <div class="video-upload">
                <input type="file" id="video-upload" accept="video/*">
                <label for="video-upload">비디오 업로드</label>
            </div>
            <div class="video-preview"></div>
            <div class="editor-controls">
                <button id="save-video">저장</button>
                <button id="clear-video">지우기</button>
            </div>
        `;
        
        // 비디오 업로드 이벤트 리스너
        document.getElementById('video-upload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                const video = document.createElement('video');
                video.src = videoURL;
                video.controls = true;
                video.style.maxWidth = '100%';
                
                const preview = document.querySelector('.video-preview');
                preview.innerHTML = '';
                preview.appendChild(video);
            }
        });
        
        // 비디오 에디터 버튼 이벤트 리스너
        document.getElementById('save-video').addEventListener('click', function() {
            if (document.querySelector('.video-preview video')) {
                alert('비디오가 저장되었습니다.');
            } else {
                alert('저장할 비디오가 없습니다.');
            }
        });
        
        document.getElementById('clear-video').addEventListener('click', function() {
            document.querySelector('.video-preview').innerHTML = '';
            document.getElementById('video-upload').value = '';
        });
    }
    
    // 스크롤 애니메이션
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});
