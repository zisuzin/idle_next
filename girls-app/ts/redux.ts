/* Redux toolkit 불러오기 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* 액션 생성자 함수에서 비동기 처리 */
export const updateImg = createAsyncThunk('ref/updateImage', async(imgSrc: string) => {
    // const response = await fetchSomeData(imgSrc);
    // return response;
});

const imageSlice = createSlice({
    name: 'ref', // slice 식별 이름
    initialState: { // 초기값
        imgSrc: './images/init_bg.png',
        alTit: '재생 곡 없음',
        audSrc: '',
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
    },
});

export const { setImg, setTit, setAudio } = imageSlice.actions;
export default imageSlice.reducer;