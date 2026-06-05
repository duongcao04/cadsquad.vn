import { Button, Card, Chip, Spinner } from '@heroui/react'
import { CheckCircle2 } from 'lucide-react'

import RichTextEditor from '@/components/RichTextEditor'

export function ContentStep({
    activeLang,
    formData,
    handleTranslationChange,
    setStep,
    isPending,
    mode,
}: any) {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full flex-1 min-h-[750px]">
            <Card className="border-l-4 border-l-secondary shrink-0">
                <Card.Content className="flex-row items-center justify-between p-5">
                    <div>
                        <p className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-1">
                            Writing content for
                        </p>
                        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                            {formData.translations[activeLang].title ||
                                'Untitled Service'}
                            <Chip size="sm" variant="soft" color="default">
                                /
                                {formData.translations[activeLang].slug ||
                                    'no-slug'}
                            </Chip>
                        </h3>
                    </div>
                    <Button
                        variant="ghost"
                        onPress={() => setStep('general')}
                    >
                        Edit General Info
                    </Button>
                </Card.Content>
            </Card>

            <Card className="flex-1 flex flex-col overflow-hidden border-none min-h-[600px]">
                <div className="flex-1 overflow-hidden flex flex-col bg-white">
                    <RichTextEditor
                        value={formData.translations[activeLang].content}
                        onChange={(htmlValue) =>
                            handleTranslationChange('content', htmlValue)
                        }
                    />
                </div>
                <div className="border-t border-divider p-5 bg-default-50 flex items-center justify-between shrink-0">
                    <div className="text-sm font-medium text-default-500 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-success" />{' '}
                        Auto-saved locally
                    </div>
                    <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        className="font-medium shadow-md shadow-secondary/20 px-10"
                        isDisabled={isPending}
                    >
                        {isPending ? (
                            <><Spinner size="sm" color="current" /> Publishing...</>
                        ) : mode === 'edit' ? (
                            'Update Service'
                        ) : (
                            'Publish Service'
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    )
}
