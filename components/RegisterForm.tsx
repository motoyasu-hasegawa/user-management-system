import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createUser } from "../utils/api";

// 入力項目の型定義
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}

// ユーザー登録フォームのプロパティ型定義
interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

// ユーザー登録フォームコンポーネント
const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  disabled,
}) => {
  // react-hook-formのuseFormフックを使用してフォームの状態を管理
  const {
    register, // フォームの入力項目を登録
    handleSubmit, // フォームの送信を処理
    formState: { errors }, // フォームのエラーステート
  } = useForm<RegisterFormInputs>();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // フォームの送信処理
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      // APIを呼び出してユーザーを登録
      await createUser(data);
      setSuccessMessage("ユーザーが正常に登録されました。");
      setErrorMessage(null);
      if (onSuccess) onSuccess(); // 成功時のコールバック
    } catch (error) {
      // エラー処理
      setErrorMessage("ユーザー登録中にエラーが発生しました。");
      setSuccessMessage(null);
      if (onError) onError(error); // エラー時のコールバック
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          {...register("name", { required: "名前は必須です" })}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="メール"
          {...register("email", {
            required: "メールは必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="ロール"
          {...register("role", { required: "ロールは必須です" })}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.role}
          helperText={errors.role?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={disabled}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
