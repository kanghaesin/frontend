export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
    return {
      Authorization: "Bearer " + user.access_token,
      // Authorization:
      // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5MDg1MzgwOSwiZXhwIjoxNjkwOTQwMjA5fQ.g0x5TgOVK2PtOOf-meITVzjVa5GBoMUh0UUdjXsyaak",
    }; // for Spring Boot back-end
    // return { 'x-access-token': user.access_token };       // for Node.js Express back-end
  } else {
    return {};
  }
}
