import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { Activity, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 사용자명 검증
    if (username.length < 3) {
      setError('사용자명은 최소 3자 이상이어야 합니다.');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('사용자명은 영문, 숫자, 언더스코어(_)만 사용 가능합니다.');
      return;
    }

    // 비밀번호 검증
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    try {
      await register({ username, password });
      setRegisteredUsername(username);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 완료 화면
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                
                <h1 className="text-2xl font-bold mb-2">회원가입 완료!</h1>
                <p className="text-muted-foreground mb-6">
                  <span className="font-semibold text-foreground">{registeredUsername}</span>님의 계정이 성공적으로 생성되었습니다.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  이제 로그인하여 서비스를 이용하실 수 있습니다.
                </p>

                <Button 
                  onClick={() => navigate('/login')} 
                  className="w-full"
                  size="lg"
                >
                  로그인하러 가기
                </Button>

                <div className="mt-6 text-sm text-muted-foreground">
                  <Link to="/" className="text-primary hover:underline">
                    홈으로 돌아가기
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Activity className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">회원가입</h1>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">사용자명</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="3-20자, 영문/숫자/_만 가능"
                  required
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  영문, 숫자, 언더스코어(_)만 사용 가능합니다.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="최소 6자 이상"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '가입 중...' : '회원가입'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-primary hover:underline">
                로그인
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

