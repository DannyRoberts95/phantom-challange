export default function formatDate(value: string | Date) {
  return `${new Date(value).getDate()}/${
    new Date(value).getMonth() + 1
  }/${new Date(value).getFullYear()}`;
}
