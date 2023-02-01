import jwtDecode from "jwt-decode";
import instance from "../instance_axios/instance";

/***_______  make API's   ________**/

/***_______  GET userName to token   ________**/

export async function getUserToToken() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token Not Found");
  let decode = jwtDecode(token);
  return decode;
}

/***_______  authenticate user  ________**/

export async function authenticate(userName) {
  try {
    return await instance.post("/authenticate", { userName });
  } catch (err) {
    return { error: "Username doesn't exist...!" };
  }
}

/***_______  get user  ________**/
export async function getUser({ userName }) {
  try {
    const { data } = await instance.get(`/user/${userName}`);
    return { data };
  } catch (err) {
    return { error: err?.message };
  }
}
export async function getUser2({ userName }) {
  try {
    const { data } = await instance.get(`/user/userName?userName=${userName}`);
    return { data };
  } catch (err) {
    return { error: err?.message };
  }
}

/***_______  register funtion   ________**/

export async function registerUser(cradentials) {
  try {
    const {
      data: { msg },
      status,
    } = await instance.post("/signUp", cradentials);
    const { email, userName } = cradentials;
    // send mail
    if (status === 200) {
      await instance.post("/registerMail", {
        userName,
        email,
        text: msg,
        subject: "Register Successfull",
      });
    }
  } catch (err) {
    return Promise.reject({ error: err?.message });
  }
}

/***_______   login function  ________**/

export async function verifyPassword({ userName, password }) {
  try {
    const { data } = await instance.post("/login", {
      email: userName,
      password,
    });
    return Promise.resolve({ data });
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
}

/***_______   update funtion  ________**/

export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await instance.put("/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (err) {
    console.log(err);
    return Promise.reject({ error: err?.message });
  }
}

/***_______  genarate OTP   ________**/

export async function generateOTP(userName) {
  try {
    const {
      data: { OTP },
      status,
    } = await instance.get("/generateOTP", { params: { email: userName } }); // params key is email in backend
    // send mail with otp
    if (status === 201) {
      let {
        data: { email },
      } = await getUser2({ userName });
      let text = `Your password recovery OTP is <h2>${OTP}</h2> Verify and recover your password.`;
      await instance.post("/registerMail", {
        userName,
        email,
        text,
        subject: "Password Recovery OTP.",
      });
    }

    return Promise.resolve({ OTP, status });
  } catch (err) {
    return Promise.reject({ error: err?.message });
  }
}

/***_______  verify OTP  ________**/

export async function verifyOTP({ userName, OTP }) {
  try {
    const { data, status } = await instance.get(
      `/verifyOTP?code=${OTP}&email=${userName}`
    );
    return { data, status };
  } catch (err) {
    return Promise.reject({ error: err?.message });
  }
}

/***_______   reset the password  ________**/

export async function resetPassword({ email, password }) {
  try {
    const { data, status } = await instance.put("/resetPassword", {
      email,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (err) {
    console.log(err.message);
    return Promise.reject({ error: err?.message });
  }
}

/***_______  logout   ________**/
