/* Redux toolkit 불러오기 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 'persist:root' 키로 로컬스 데이터 가져오기
// const saveDta:any = localStorage.getItem("persist:root");
// const parseDta = JSON.parse(saveDta);

const imageSlice = createSlice({
    name: 'ref', // slice 식별 이름
    initialState: { // 초기값
        imgSrc: './images/init_bg.png',
        alTit: '재생 곡 없음',
        audSrc: '',
        setMp: [],
    }, 
    reducers: {
        setImg: (state, action) => {
            state.imgSrc = action.payload;
        },
        setTit: (state, action) => {
            state.alTit = action.payload;
        },
        setAudio: (state, action) => {
            state.audSrc = action.payload;
        },
        setPlayer: (state, action) => {
            state.setMp.push(action.payload);
        } 
    },
});

console.log(imageSlice.reducer)

export const { setImg, setTit, setAudio, setPlayer } = imageSlice.actions;
export default imageSlice.reducer;