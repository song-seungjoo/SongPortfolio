

//nav 스크롤
const animationMove = function (selector) {
    const targetEl = document.querySelector(selector);

    // ScrollIntoView로 부드럽게 이동
    targetEl.scrollIntoView({
        behavior: 'smooth', // 부드럽게 스크롤
        block: 'start' // 스크롤이 타겟의 상단에 맞춰지도록 설정
    });
}
const scrollMove = document.querySelectorAll('[data-animation-scroll="true"]');
for (let i = 0; i < scrollMove.length; i++) {
    scrollMove[i].addEventListener('click', function () {
        const target = this.dataset.target;
        animationMove(target);
    });
}

//상단 시계
$(function () {
    // script.js
    $(document).ready(function () {
        function updateTime() {
            var now = new Date();

            // 월, 날짜, 오전/오후, 시, 분, 요일을 구하기
            var month = now.getMonth() + 1; // 0부터 시작하므로 1을 더해줍니다.
            var date = now.getDate();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var dayOfWeek = now.getDay();

            // 오전/오후 구하기
            var ampm = hours >= 12 ? '오후' : '오전';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0은 12시로 처리
            minutes = minutes < 10 ? '0' + minutes : minutes; // 분을 두 자리로 표시

            // 요일 배열 (0=일요일, 1=월요일, ..., 6=토요일)
            var days = ['일', '월', '화', '수', '목', '금', '토'];
            var dayName = days[dayOfWeek];

            // 시간 포맷팅
            var currentTime = month + '월 ' + date + '일 (' + dayName + ') ' + ampm + ' ' + hours + ':' + minutes;

            // HTML에 시간 업데이트
            $('#clock').text(currentTime);
        }

        // 페이지 로드 시 처음으로 시간 표시
        updateTime();

        // 1초마다 시간을 갱신
        setInterval(updateTime, 1000);
    });
})

//.in 오픈 애니메이션
$(document).ready(function () {
    // 페이지 로드 시 .in 숨기기 및 초기 상태 설정
    $('.in').hide().css({
        'position': 'absolute',               // absolute 위치 설정
        'top': '6%',                        // 상단에서 30px
        'left': '50%',                        // 가로 중앙에 배치
        'transform': 'translateX(-50%) scale(0)', // 가로 중앙 정렬 후 scale(0)으로 숨기기
        'width': '96.5%',                    // 너비는 1850px로 설정
        'display': 'flex',                    // flex로 설정
        'justify-content': 'center',          // 중앙 정렬
        'margin': '0 auto',                   // 자동으로 좌우 마진 설정
        // 'margin-top': '30px',                 // 상단 30px 여백 설정
        // 'border-radius': '20px',              // 테두리 둥글게 설정
        'box-shadow': 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', // 기본 그림자 설정
        'overflow': 'hidden',                 // 넘치는 콘텐츠 숨기기
        'opacity': '0',                       // 불투명도 0으로 설정 (초기 상태에서 보이지 않음)
        'transform-origin': 'center center'   // 중앙에서 확장되도록 설정
    });

    // 상태를 추적하는 변수
    let isReduced = false;  // 크기가 축소되었는지 여부를 추적

    // .open 안의 .folder 클릭 시 .in이 확장되게 하기
    $('.open .folder').click(function () {
        // 애니메이션이 진행 중일 때 클릭 방지
        if ($('.in').hasClass('animating')) return;

        // 애니메이션이 시작되면 'animating' 클래스를 추가하여 다른 클릭을 방지
        $('.in').addClass('animating');

        // .in 요소가 확장될 때 애니메이션
        if ($('.in').css('transform') === 'matrix(1, 0, 0, 1, 0, 0)') { // 확장된 상태일 때 축소
            $('.in').css({
                'transition': 'transform .8s ease, opacity .8s ease, box-shadow .8s ease', // 애니메이션 효과
                'transform': 'translateX(-50%) scale(0)',  // scale(0)으로 축소
                'opacity': '0', // 불투명도 0으로 변경
                'box-shadow': 'rgba(0, 0, 0, 0.15) 0px 3px 5px 0px' // 축소된 box-shadow
            }).one('transitionend', function () {
                // 애니메이션 끝난 후 'animating' 클래스 제거
                $('.in').removeClass('animating');
            });
        } else { // 확장되지 않은 상태일 때 확장
            $('.in').css({
                'opacity': '1',  // 바로 불투명도 1로 설정
                'transition': 'transform .8s ease, box-shadow .8s ease' // transform과 box-shadow 애니메이션
            }).animate({
                opacity: 1  // 서서히 나타나게 설정
            }, 0, function () {
                $('.in').css({
                    'transform': 'translateX(-50%) scale(1)',  // scale(1)로 확장
                    'box-shadow': 'rgba(0, 0, 0, 0.15) 0px 10px 30px 0px' // 그림자 확장
                }).one('transitionend', function () {
                    // 애니메이션 끝난 후 'animating' 클래스 제거
                    $('.in').removeClass('animating');
                });
            });
        }
    });

});
//닫기 버튼
// .in header .button .one 클릭 시 .in이 축소되고 불투명도가 줄어드는 애니메이션
$('.in header .button .one').click(function () {
    // 애니메이션이 진행 중일 때 클릭 방지
    if ($('.in').hasClass('animating')) return;

    // 애니메이션이 시작되면 'animating' 클래스를 추가하여 다른 클릭을 방지
    $('.in').addClass('animating');

    // .in 요소가 축소되고 불투명도가 줄어드는 애니메이션
    $('.in').css({
        'transition': 'transform .8s ease, opacity .8s ease, box-shadow .8s ease',
        'transform': 'translateX(-50%) scale(0)', // scale(0)으로 축소
        'opacity': '0', // 불투명도 0으로 변경
        'box-shadow': 'rgba(0, 0, 0, 0.15) 0px 3px 5px 0px' // 축소된 box-shadow
    }).one('transitionend', function () {
        // 애니메이션 끝난 후 'animating' 클래스 제거
        $('.in').removeClass('animating');
    });
});

// .in header .button .two 클릭 시 슬라이드 다운 애니메이션
$('.in header .button .two').click(function () {
    // 애니메이션이 진행 중일 때 클릭 방지
    if ($('.in').hasClass('animating')) return;

    // 애니메이션이 시작되면 'animating' 클래스를 추가하여 다른 클릭을 방지
    $('.in').addClass('animating');

    // .in 요소가 슬라이드 다운되며 불투명도가 줄어드는 애니메이션
    $('.in').css({
        'transition': 'transform 1s ease, opacity 1s ease',  // 슬라이드 다운과 불투명도 변환 애니메이션
        'transform': 'translateX(-50%) translateY(80%)',  // Y축으로 80% 만큼 내려간다
        'opacity': '0'  // 불투명도를 0으로 변경
    }).one('transitionend', function () {
        // 애니메이션 끝난 후 'animating' 클래스 제거
        $('.in').removeClass('animating');
    });
});


$(window).on('load', function () {
    const $folderImg = $('.folder img');
    const $folderDiv = $('.folder');
    let scaleTimeout;
  
    // 1초 뒤 bounce 애니메이션 적용
    setTimeout(() => {
      $folderImg.addClass('bounce-animation');
    }, 1000);
  
    $folderDiv.on('mouseenter', function () {
      $folderImg.removeClass('bounce-animation');
      clearTimeout(scaleTimeout);
  
      scaleTimeout = setTimeout(() => {
        $folderImg.addClass('scale-up');
      }, 150);
    });
  
    $folderDiv.on('mouseleave', function () {
      $folderImg.removeClass('scale-up').addClass('bounce-animation');
      clearTimeout(scaleTimeout);
    });
  });
  