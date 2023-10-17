/* Redux toolkit 불러오기 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'ref', // slice 식별 이름
    initialState: { imgSrc: './images/init_bg.png', alTit: '재생 곡 없음', audSrc: '', setMp: [] as string[] }, // 초기값
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

export const { setImg, setTit, setAudio, setPlayer } = imageSlice.actions;
export default imageSlice.reducer;