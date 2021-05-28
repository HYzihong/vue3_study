import axios from "axios";
import { ref } from "vue";

/*
 * @Author: your name
 * @Date: 2021-05-27 21:55:58
 * @LastEditTime: 2021-05-28 09:14:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-study/src/hooks/userURLLoader.ts
 */
// interface dogType {
//   message: string;
//   status: string;
// }
// interface dataType {
//   result: Ref<dogType>;
//   loading: Ref<boolean>;
//   loaded: Ref<boolean>;
//   error: Ref<unknown>;
// }
// interface dataType<T> {
//   result: Ref<null | T>;
//   loading: Ref<boolean>;
//   loaded: Ref<boolean>;
//   error: Ref<unknown>;
// }
// function getDataLoader<T>(url: string): dataType {
// function getDataLoader<T>(url: string): dataType<T> {
async function getDataLoader<T>(url: string) {
  const result = ref<T | null>(null);
  const loading = ref(true);
  const loaded = ref(false);
  const error = ref(null);
  await axios
    .get(url)
    .then((rawData) => {
      loading.value = false;
      loaded.value = true;
      result.value = rawData.data;
      // console.log(result.value);
    })
    .catch((err) => {
      error.value = err;
      loading.value = false;
    });
  return {
    result,
    loading,
    loaded,
    error,
  };
}
export default getDataLoader;
