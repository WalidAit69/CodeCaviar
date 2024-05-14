import getSession from "./getSession";


export const currentUser = async () => {
  const session = await getSession();

  return session?.user;
};

export const currentRole = async () => {
  const session = await getSession();

  return session?.user.role;
};
