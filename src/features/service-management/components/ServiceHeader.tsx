import {
    Button,
    Card,
    Dropdown,
    Tabs,
} from '@heroui/react'
import { Plus } from 'lucide-react'

export function ServiceHeader({
    step,
    setStep,
    activeLang,
    setActiveLang,
    activeLanguages,
    unselectedLanguages,
    handleAddLanguage,
    SUPPORTED_LANGUAGES,
}: any) {
    return (
        <Card className="border-none w-full shrink-0">
            <Card.Content className="flex-row items-center justify-between px-6 py-4">
                <Tabs
                    selectedKey={step}
                    onSelectionChange={(key) => setStep(key)}
                >
                    <Tabs.List>
                        <Tabs.Tab id="general">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'general' ? 'bg-secondary text-white' : 'bg-default-200'}`}
                                >
                                    1
                                </div>
                                General Info
                            </div>
                        </Tabs.Tab>
                        <Tabs.Tab id="content">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'content' ? 'bg-secondary text-white' : 'bg-default-200'}`}
                                >
                                    2
                                </div>
                                Write Content
                            </div>
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <div className="flex items-center gap-1 bg-default-100 p-1 rounded-full">
                    <Tabs
                        selectedKey={activeLang}
                        onSelectionChange={(key) => setActiveLang(key)}
                    >
                        <Tabs.List>
                            {activeLanguages.map((langKey: string) => {
                                const langConfig = SUPPORTED_LANGUAGES.find(
                                    (l: any) => l.key === langKey
                                )
                                return (
                                    <Tabs.Tab key={langKey} id={langKey}>
                                        {langConfig?.label}
                                    </Tabs.Tab>
                                )
                            })}
                        </Tabs.List>
                    </Tabs>
                    {unselectedLanguages.length > 0 && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    className="ml-1"
                                >
                                    <Plus size={16} />
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Popover>
                                <Dropdown.Menu
                                    aria-label="Add Translation"
                                    onAction={(key) => handleAddLanguage(key)}
                                >
                                    {unselectedLanguages.map((lang: any) => (
                                        <Dropdown.Item key={lang.key} id={lang.key}>
                                            {lang.label}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    )}
                </div>
            </Card.Content>
        </Card>
    )
}
