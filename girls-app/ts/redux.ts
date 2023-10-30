/* Redux toolkit 불러오기 */
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'ref', // slice 식별 이름
    initialState: { // 초기값
        imgSrc: './images/init_bg.png',
        alTit: '재생 곡 없음',
        audSrc: '',
        alIdx: '',
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
        setIndex: (state, action) => {
            state.alIdx = action.payload;
        }
    },
});

export const { setImg, setTit, setAudio, setIndex } = imageSlice.actions;
export default imageSlice.reducer;