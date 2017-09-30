class WhereCtrl {
    constructor() {
        this.locations = ['Eunpyeong', 'Gangbuk', 'Dobong', 'Gangnam'
        , 'Jongno' , 'Seongbuk', 'Dongdaemun', 'Mapo',
        'Gangseo', 'Jung-gu', 'Seong-dong', 'Nowon',
        'Yeongdeungpo','Yangcheon','Dongjak','Seocho',
        'Songpa','Gangdong','Guro','Geumcheon',
        'Gwanak','Gwangjin','Jungnang','Yongsan','Seodaemun'];
        this.selected = null;

        this.whereSelect = function ($index){
                this.selected = $index;
        }
    }
}



export default angular.module('touriends.page.where', ['touriends']).controller('WhereCtrl', WhereCtrl).name;