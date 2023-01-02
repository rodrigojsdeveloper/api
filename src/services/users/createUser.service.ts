import { userRepository } from "../../repositories/user.repository";
import { BadRequestError } from "../../errors/badRequest.error";
import { IUser } from "../../interfaces/user.interface";
import { User } from "../../entities/user.entity";
import { createTransport } from "nodemailer";
import { hash } from "bcrypt";

const createUserService = async (user: IUser): Promise<User> => {
  if (await userRepository.findOneBy({ email: user.email })) {
    throw new BadRequestError("Email already exists");
  }

  const hashedPassword = await hash(user.password, 10);

  const newUser = new User();
  newUser.name = user.name;
  newUser.email = user.email;
  newUser.password = hashedPassword;
  newUser.is_adm = user.is_adm;
  newUser.properties = [];

  userRepository.create(newUser);
  await userRepository.save(newUser);

  Reflect.deleteProperty(newUser, "password");

  const transporter = createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_EMAIL,
      to: user.email,
      subject: "Created user",
      html: "Thanks for creating an account on my app",
    })
    .catch((err) => {
      console.error(err);
      throw new BadRequestError("Error sending email, try again later");
    });

  return newUser;
};

export { createUserService };
