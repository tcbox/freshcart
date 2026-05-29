import { authService } from "../backend/services/authService";

async function test() {
  const user1 = await authService.registerUser(
    "tinkuwfe@gmaill.com",
    "3897234578958234",
    "",
    "tinku",
    "candy",
  );
  console.log(user1);
}
test();
