import { CircleAlert, Info } from 'lucide-react-native';
import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/constants/theme';

export type DialogTone = 'default' | 'danger';

export interface AlertOptions {
  title: string;
  message?: string;
  buttonLabel?: string;
  tone?: DialogTone;
}

export interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: DialogTone;
}

export interface DialogApi {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  alert: (options: AlertOptions) => Promise<void>;
}

type DialogRequest =
  | { kind: 'alert'; options: AlertOptions }
  | { kind: 'confirm'; options: ConfirmOptions };

export const DialogContext = createContext<DialogApi | null>(null);

interface DialogBodyProps {
  request: DialogRequest;
  onConfirm: () => void;
  onCancel: () => void;
}

function DialogBody({ request, onConfirm, onCancel }: DialogBodyProps) {
  const isDanger = request.options.tone === 'danger';
  const Icon = isDanger ? CircleAlert : Info;

  return (
    <View style={styles.body}>
      <View style={[styles.icon, isDanger ? styles.iconDanger : styles.iconDefault]}>
        <Icon color={isDanger ? colors.danger : colors.primary} size={28} strokeWidth={2.2} />
      </View>
      <AppText variant="heading" align="center">
        {request.options.title}
      </AppText>
      {request.options.message ? (
        <AppText variant="body" color={colors.textSecondary} align="center">
          {request.options.message}
        </AppText>
      ) : null}

      <View style={styles.actions}>
        {request.kind === 'confirm' ? (
          <>
            <Button
              title={request.options.confirmLabel ?? 'Ya'}
              variant={isDanger ? 'danger' : 'primary'}
              onPress={onConfirm}
            />
            <Button title={request.options.cancelLabel ?? 'Batal'} variant="ghost" onPress={onCancel} />
          </>
        ) : (
          <Button title={request.options.buttonLabel ?? 'Mengerti'} onPress={onConfirm} />
        )}
      </View>
    </View>
  );
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<DialogRequest | null>(null);
  const [visible, setVisible] = useState(false);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const open = useCallback((next: DialogRequest) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current?.(false);
      resolverRef.current = resolve;
      setRequest(next);
      setVisible(true);
    });
  }, []);

  const close = useCallback((result: boolean) => {
    const resolver = resolverRef.current;
    resolverRef.current = null;
    setVisible(false);
    resolver?.(result);
  }, []);

  const api = useMemo<DialogApi>(
    () => ({
      confirm: (options) => open({ kind: 'confirm', options }),
      alert: async (options) => {
        await open({ kind: 'alert', options });
      },
    }),
    [open],
  );

  return (
    <DialogContext.Provider value={api}>
      {children}
      <BottomSheet visible={visible} onClose={() => close(false)}>
        {request ? (
          <DialogBody
            request={request}
            onConfirm={() => close(true)}
            onCancel={() => close(false)}
          />
        ) : null}
      </BottomSheet>
    </DialogContext.Provider>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    gap: spacing.md,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  iconDefault: {
    backgroundColor: colors.primarySoft,
  },
  iconDanger: {
    backgroundColor: colors.dangerSoft,
  },
  actions: {
    alignSelf: 'stretch',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});