import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm",
  component: RegisterForm,
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    onSuccess: () => {
      console.log("Registration successful!");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
    disabled: false,
  },
};
