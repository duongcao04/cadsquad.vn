import {
    Button,
    Card,
    CardBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Tab,
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
        <Card shadow="sm" radius="lg" className="border-none w-full shrink-0">
            <CardBody className="flex-row items-center justify-between px-6 py-4">
                <Tabs
                    selectedKey={step}
                    onSelectionChange={(key) => setStep(key)}
                    color="secondary"
                    variant="light"
                    classNames={{
                        cursor: 'bg-secondary-100 text-secondary-600',
                    }}
                >
                    <Tab
                        key="general"
                        title={
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'general' ? 'bg-secondary text-white' : 'bg-default-200'}`}
                                >
                                    1
                                </div>
                                General Info
                            </div>
                        }
                    />
                    <Tab
                        key="content"
                        title={
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'content' ? 'bg-secondary text-white' : 'bg-default-200'}`}
                                >
                                    2
                                </div>
                                Write Content
                            </div>
                        }
                    />
                </Tabs>

                <div className="flex items-center gap-1 bg-default-100 p-1 rounded-full">
                    <Tabs
                        selectedKey={activeLang}
                        onSelectionChange={(key) => setActiveLang(key)}
                        color="secondary"
                        radius="full"
                        size="sm"
                    >
                        {activeLanguages.map((langKey: string) => {
                            const langConfig = SUPPORTED_LANGUAGES.find(
                                (l: any) => l.key === langKey
                            )
                            return (
                                <Tab key={langKey} title={langConfig?.label} />
                            )
                        })}
                    </Tabs>
                    {unselectedLanguages.length > 0 && (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    color="secondary"
                                    radius="full"
                                    className="ml-1"
                                >
                                    <Plus size={16} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Add Translation"
                                onAction={(key) => handleAddLanguage(key)}
                            >
                                {unselectedLanguages.map((lang: any) => (
                                    <DropdownItem key={lang.key}>
                                        {lang.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}
